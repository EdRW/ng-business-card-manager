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
      this.authService.user.subscribe( user => {
        this.userContactsRef = this.db.list(`users/${user.uid}/contacts`);
      });
  }

  getUserContacts() {
    return this.userContactsRef.valueChanges();
  }

  addNewContact(businessCard: BusinessCard) {
    this.userContactsRef.push(businessCard);
  }
}
