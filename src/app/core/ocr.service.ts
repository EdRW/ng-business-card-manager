import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { gcpCloudVision } from 'src/environments/environment';
import { BusinessCard } from '../shared/models/business-card';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

interface GcpResponse {
  responses: {
    fullTextAnnotation: {
      text: string,
    }
  }[];
}


@Injectable()
export class OcrService {
  readonly url = `https://vision.googleapis.com/v1/images:annotate?key=${gcpCloudVision.apiKey}`;

  constructor(private http: HttpClient) { }

  textDetection(base64Img: string): Observable<BusinessCard>  {
    const base64ImgNoHeader = base64Img.replace(/^data:image\/(png|jpg|jpeg);base64,/, '');
    const request: any = {
      'requests': [
        {
          'image': {
            'content': `${base64ImgNoHeader}`,
          },
          'features': [
            {
              'type': 'TEXT_DETECTION',
              'maxResults': 1,
            }
          ]
        }
      ]
    };

    return this.http.post(
      this.url,
      request
    ).pipe( map((results: any) => {
        console.log('OCR RESULTS RESULTS');
        console.log('RESPONSE\n', results);
        const responseText = this.getTextFromResponse(results);
        console.log(`RESPONSE TEXT: ${responseText}`);
        const businessCard = this.parseBusinessCardFromText(responseText, base64Img);
        console.log('BUSINESSCARD:\n', businessCard);
        console.log('OCR RESULTS RESULTS');
        return businessCard;
      })
    );
  }

  getTextFromResponse(json: any): string {
    return (json as GcpResponse).responses[0].fullTextAnnotation.text;
  }

  parseBusinessCardFromText(responseText: string, base64Img: string): BusinessCard {
    const firstLastNamesRegEx = /^[A-Z][-'a-zA-Z]+,?\s[A-Z][-'a-zA-Z]{0,19}$/;
    const phoneNumberRegEx = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
    // tslint:disable-next-line:max-line-length
    const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const responseLines = responseText.split('\n');
    const businessCard = new BusinessCard();
    let extraText = '';
    responseLines.forEach( (line: string) => {
      if (firstLastNamesRegEx.test(line) && !businessCard.firstName) {
        const names = line.split(' ');
        businessCard.firstName = names[0];
        businessCard.lastName = names[1];
      } else if (phoneNumberRegEx.test(line) && !businessCard.phoneNumber) { businessCard.phoneNumber = line;
      } else if (emailRegEx.test(line) && !businessCard.email) {
        businessCard.email = line;
      } else {
        extraText = extraText.concat(`${line}\n`);
      }
    });
    businessCard.extraText = extraText;
    businessCard.imageString = base64Img;
    return businessCard;
  }

}
