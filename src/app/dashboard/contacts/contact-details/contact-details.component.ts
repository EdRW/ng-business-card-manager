import { Component, OnInit, Input } from '@angular/core';
import {  } from '../../../core/core.module';
import { BusinessCard } from 'src/app/shared/models/business-card';
import { ContactsService } from 'src/app/core/contacts.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap, mergeMap, take } from 'rxjs/operators';
import { of } from 'rxjs';
import { HistoryService } from 'src/app/core/history.service';
import { Action } from 'src/app/shared/models/history-log';
// gtag declartion used in saveClicked()
declare var gtag: Function;

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.css']
})
export class ContactDetailsComponent implements OnInit {
  @Input() businessCard: BusinessCard;
  @Input() canEdit: boolean;

  constructor(private contactsService: ContactsService,
              private historyService: HistoryService,
              private route: ActivatedRoute) {
    this.businessCard = new BusinessCard();
    this.canEdit = false;
    this.route
        .params
        .pipe(
          switchMap(params => {
          console.log('params: ' + params['id']);
          const query: string = params['id'];
            return this.contactsService.getContact(query);
        }),
        ).subscribe( businessCard => {
          if ( businessCard ) {
            console.log('BUSINESSCARD GRABED FROM FIREBASE: ', businessCard);
          this.businessCard = businessCard;
          } else {
            console.log('ROUTE SET TO ADD, MAKE NEW BUSINESS CARD');
            this.businessCard = new BusinessCard();
          }
        });
  }

  ngOnInit() {
    // if the businessCard wasnt injected by a parent element then create a new one.
    /*
    if (!this.businessCard) {
      this.businessCard = new BusinessCard();
    } else {
      console.log('BUSINESSCARD WAS CREATED DUE TO ROUTING');
    }
    */
  }

  editClicked() {
    this.canEdit = true;
  }

  saveClicked() {
    this.historyService.log(Action.AddedContact, this.businessCard.email);
    gtag('event', 'card_added');
    this.canEdit = false;
    this.contactsService.addNewContact(this.businessCard);
  }

}
