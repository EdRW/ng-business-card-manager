import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { gcpCloudVision } from 'src/environments/environment';

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

  extractText() {
    this.http.post(
      this.url,
      this.request
    ).subscribe( (results: any) => {
      console.log('OCR RESULTS RESULTS');
      console.log(results);
      console.log('OCR RESULTS RESULTS');
    });
  }
}
