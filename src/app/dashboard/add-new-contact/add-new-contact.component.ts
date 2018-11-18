import { Component, OnInit } from '@angular/core';
import { OcrService } from 'src/app/core/ocr.service';

@Component({
  selector: 'app-add-new-contact',
  templateUrl: './add-new-contact.component.html',
  styleUrls: ['./add-new-contact.component.css']
})
export class AddNewContactComponent implements OnInit {

  constructor(private ocrService: OcrService) { }

  ngOnInit() {
  }

  testOcrService() {
    this.ocrService.extractText();
  }
}
