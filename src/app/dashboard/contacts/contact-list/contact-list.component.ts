import { Component, OnInit } from '@angular/core';
import { BusinessCard } from 'src/app/shared/models/business-card';
import { ContactsService } from 'src/app/core/contacts.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  businessCards: BusinessCard[];

  constructor(private contactService: ContactsService) { }

  ngOnInit() {
    this.contactService.getUserContacts().subscribe( (businessCardList: BusinessCard[]) => {
      this.businessCards =  businessCardList;
    });
  }

}
