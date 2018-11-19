import { Component, OnInit, Input } from '@angular/core';
import {  } from '../../../core/core.module';
import { BusinessCard } from 'src/app/shared/models/business-card';
import { ContactsService } from 'src/app/core/contacts.service';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.css']
})
export class ContactDetailsComponent implements OnInit {
  @Input() businessCard: BusinessCard;
  @Input() canEdit: boolean;

  constructor(private contactsService: ContactsService) {
    this.businessCard = new BusinessCard();
    this.canEdit = false;
  }

  ngOnInit() {
  }

  editClicked() {
    this.canEdit = true;
  }

  saveClicked() {
    this.canEdit = false;
    this.contactsService.addNewContact(this.businessCard);
  }

}
