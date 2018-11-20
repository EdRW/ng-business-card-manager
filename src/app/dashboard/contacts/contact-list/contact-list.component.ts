import { Component, OnInit } from '@angular/core';
import { BusinessCard } from 'src/app/shared/models/business-card';
import { ContactsService } from 'src/app/core/contacts.service';
import { Contact } from 'src/app/shared/models/contact';
import * as _ from 'lodash';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  // businessCards: BusinessCard[];
  contacts: Contact[];
  filteredContacts: Contact[];
  searchInput = new FormControl();
  searchString: string;

  constructor(private contactService: ContactsService) {
    this.searchString = '';
  }

  ngOnInit() {
    this.contactService.getUserContactsSnapshots()
      .subscribe( contacts => {
        this.contacts = contacts;
        console.log(this.contacts);
        this.applyFilters();
    });

    this.searchInput.valueChanges
      .pipe(debounceTime(500))
      .subscribe( (newValue: string) => {
        this.searchString = newValue.toLowerCase();
        this.applyFilters();
      });

  }

  private applyFilters() {
    if (this.searchString) {
      this.filteredContacts = _.filter(this.contacts, (contact: Contact) => {
        // tslint:disable-next-line:max-line-length
        return `${contact.businessCard.firstName} ${contact.businessCard.lastName} ${contact.businessCard.email}`
          .toLocaleLowerCase()
          .includes(this.searchString);
     });
    } else {
      this.filteredContacts = this.contacts;
    }
  }
}
