import { Component, OnInit } from '@angular/core';
import { OcrService } from 'src/app/core/ocr.service';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';
import { BusinessCard } from 'src/app/shared/models/business-card';
declare var require: any;
const domtoimage = require('dom-to-image');

@Component({
  selector: 'app-add-new-contact',
  templateUrl: './add-new-contact.component.html',
  styleUrls: ['./add-new-contact.component.css']
})
export class AddNewContactComponent implements OnInit {
    // tslint:disable-next-line:max-line-length
    public imageUrlSrc: string;

    public newBusinessCard: BusinessCard;
    // toggle webcam on/off
    public showWebcam = true;
    public allowCameraSwitch = true;
    public multipleWebcamsAvailable = false;
    public deviceId: string;
    public videoOptions: MediaTrackConstraints = {
      // width: {ideal: 1024},
      // height: {ideal: 576}
    };
    public errors: WebcamInitError[] = [];
    // latest snapshot
    public webcamImage: WebcamImage = null;
    // webcam snapshot trigger
    private trigger: Subject<void> = new Subject<void>();
    // switch to next / previous / specific webcam; true/false: forward/backwards, string: deviceId
    private nextWebcam: Subject<boolean|string> = new Subject<boolean|string>();

  constructor(private ocrService: OcrService) {
    this.newBusinessCard = new BusinessCard();
  }

  extractTextFromWebImage() {
    this.extractTextFromDom('webImage');
  }

  setImageUrlSrc(imageUrlSrc: string) {
    this.imageUrlSrc = imageUrlSrc;
  }

  extractTextFromDom(elementId: string) {
    const imgNode = document.getElementById(elementId);
    domtoimage.toPng(imgNode)
    .then( (imageUri: string ) => {
      console.log(imageUri);
      this.ocrService.textDetection(imageUri).subscribe( (businessCard: BusinessCard) => {
        this.newBusinessCard = businessCard;
      });
    })
    .catch(error => console.log('ERROR WHEN CONVERTING IMAGE:\n', error));
  }



  public ngOnInit(): void {
    WebcamUtil.getAvailableVideoInputs()
      .then((mediaDevices: MediaDeviceInfo[]) => {
        this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
      });
  }

  public triggerSnapshot(): void {
    this.trigger.next();
  }

  public toggleWebcam(): void {
    this.showWebcam = !this.showWebcam;
  }

  public handleInitError(error: WebcamInitError): void {
    this.errors.push(error);
  }

  public showNextWebcam(directionOrDeviceId: boolean|string): void {
    // true => move forward through devices
    // false => move backwards through devices
    // string => move to device with given deviceId
    this.nextWebcam.next(directionOrDeviceId);
  }

  public handleImage(webcamImage: WebcamImage): void {
    // tslint:disable-next-line:no-console
    console.info('received webcam image', webcamImage);
    this.webcamImage = webcamImage;
  }

  public cameraWasSwitched(deviceId: string): void {
    console.log('active device: ' + deviceId);
    this.deviceId = deviceId;
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  public get nextWebcamObservable(): Observable<boolean|string> {
    return this.nextWebcam.asObservable();
  }
}
