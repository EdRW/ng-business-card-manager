import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { gcpCloudVision } from 'src/environments/environment';
import { BusinessCard } from '../shared/models/business-card';

interface GcpResponse {
  responses: {
    fullTextAnnotation: {
      text: string,
    }
  }[];
}

@Injectable()
export class OcrService {
  readonly request: any = {
    'requests': [
      {
        'image': {
          'source': {
            // tslint:disable-next-line:max-line-length
            'imageUri': 'https://lh3.googleusercontent.com/-sQsJlPZIPTc/ThwkpQeADtI/AAAAAAAAAuI/MWUH1I_7X0A/w530-h289-n/patrick-bateman-card.png',
          },
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

  readonly url = `https://vision.googleapis.com/v1/images:annotate?key=${gcpCloudVision.apiKey}`;

  constructor(private http: HttpClient) { }

  extractText(): BusinessCard  {
    let businessCard = null;
    this.http.post(
      this.url,
      this.request
    ).subscribe( (results: any) => {
      console.log('OCR RESULTS RESULTS');
      console.log('RESPONSE\N', results);
      const responseText = this.getTextFromResponse(results);
      businessCard = this.parseBusinessCardFromText(responseText);
      console.log('BUSINESSCARD:\n', businessCard);
      console.log('OCR RESULTS RESULTS');
    });
    return businessCard;
  }

  getTextFromResponse(json: any): string {
    return (json as GcpResponse).responses[0].fullTextAnnotation.text;
  }

  parseBusinessCardFromText(responseText: string): BusinessCard {
    const firstLastNamesRegEx = /^[A-Z][-'a-zA-Z]+,?\s[A-Z][-'a-zA-Z]{0,19}$/;
    const phoneNumberRegEx = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
    // tslint:disable-next-line:max-line-length
    const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const responseLines = responseText.split('\n');
    console.log('LINES\n', responseLines);
    const businessCard = new BusinessCard();
    responseLines.forEach( (line: string) => {
      if (firstLastNamesRegEx.test(line)) {
        const names = line.split('\s');
        businessCard.firstName = names[0];
        businessCard.lastName = names[1];
      }
      if (phoneNumberRegEx.test(line)) { businessCard.phoneNumber = line; }
      if (emailRegEx.test(line)) { businessCard.email = line; }
    });

    return businessCard;
  }

}
