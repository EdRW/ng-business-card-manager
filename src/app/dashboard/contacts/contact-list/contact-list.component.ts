import { Component, OnInit } from '@angular/core';
import { BusinessCard } from 'src/app/shared/models/business-card';
import { ContactsService } from 'src/app/core/contacts.service';
import { Contact } from 'src/app/shared/models/contact';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  // businessCards: BusinessCard[];
  contacts: Contact[];

  constructor(private contactService: ContactsService) { }

  ngOnInit() {
    // this.contactService.getUserContacts().subscribe( businessCardList => {
    //   this.businessCards =  businessCardList;
    // });

    this.contactService.getUserContactsSnapshots().subscribe( contacts => {
      this.contacts = contacts;
      console.log(this.contacts);
    });
  }
}
