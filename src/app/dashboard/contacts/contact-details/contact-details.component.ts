import { Component, OnInit } from '@angular/core';
import {  } from '../../../core/core.module';
import { BusinessCard } from 'src/app/shared/models/business-card';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.css']
})
export class ContactDetailsComponent implements OnInit {
  businessCard: BusinessCard;
  canEdit = false;

  constructor() { }

  ngOnInit() {
  }

  editClicked() {
    this.canEdit = true;
  }

  saveClicked() {
    this.canEdit = false;
  }

}
