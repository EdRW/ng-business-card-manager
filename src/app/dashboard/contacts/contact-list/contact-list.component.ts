import { Component, OnInit } from '@angular/core';
import { BusinessCard } from 'src/app/shared/models/business-card';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  businessCards: BusinessCard[];

  constructor() {
    this.businessCards = [
      new BusinessCard('John0', 'Smith'),
      new BusinessCard('John1', 'Smith'),
      new BusinessCard('John2', 'Smith'),
      new BusinessCard('John3', 'Smith')
    ];
  }

  ngOnInit() {
  }

}
