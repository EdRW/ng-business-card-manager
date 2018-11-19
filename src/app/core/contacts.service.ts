import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { BusinessCard } from '../shared/models/business-card';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  userContactsRef: AngularFireList<{}>;

  constructor(
    private authService: AuthService,
    private db: AngularFireDatabase
    ) {
    console.log('CONTACT SERVICE CONSTRUCTOR CALLED');
    this.authService.getUserStatus().subscribe( user => {
        this.userContactsRef = this.db.list(`users/${user.uid}/contacts`);
        console.log(`NEW CONTACTS TO WILL BE WRITTEN TO: users/${user.uid}/contacts`);
    });
  }

  getUserContacts() {
    // TODO find a way to make this available to comonents in their constructors
    return this.userContactsRef.valueChanges();
  }

  addNewContact(businessCard: BusinessCard) {
    console.log(`ADDING A NEW USER ${businessCard.email}`);
    this.userContactsRef.push(businessCard);
  }
}
