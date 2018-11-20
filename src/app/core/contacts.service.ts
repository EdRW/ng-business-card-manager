import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { BusinessCard } from '../shared/models/business-card';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Contact } from '../shared/models/contact';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  userContactsRef: AngularFireList<BusinessCard>;

  constructor(
    private authService: AuthService,
    private db: AngularFireDatabase
    ) {
    console.log('CONTACT SERVICE CONSTRUCTOR CALLED');
    this.authService.getUserStatus().subscribe( user => {
        this.userContactsRef = this.db.list<BusinessCard>(`users/${user.uid}/contacts`);
        console.log(`NEW CONTACTS TO WILL BE WRITTEN TO: users/${user.uid}/contacts`);
    });
  }

  getUserContacts(): Observable<BusinessCard[]> {
    // TODO find a way to make this available to comonents in their constructors
    return this.userContactsRef.valueChanges();
  }

  getUserContactsSnapshots() {
    return this.userContactsRef.snapshotChanges().pipe(
      map( actions => {
        return actions.map(action => {
          return <Contact>{ key: action.key, businessCard: action.payload.val()};
        });
      })
    );
  }

  addNewContact(businessCard: BusinessCard): string {
    console.log(`ADDING A NEW USER ${businessCard.email}`);
    return this.userContactsRef.push(businessCard).key;
  }

  getContact(key: string): Observable<BusinessCard> {
    return this.db.object<BusinessCard>(`users/${this.authService.userUid}/contacts/${key}`).valueChanges();
  }
}
