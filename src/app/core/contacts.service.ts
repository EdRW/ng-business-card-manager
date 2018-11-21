import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { BusinessCard } from '../shared/models/business-card';
import { Observable, of } from 'rxjs';
import { map, every, take, tap } from 'rxjs/operators';
import { Contact } from '../shared/models/contact';

@Injectable()
export class ContactsService {
  userContactsRef: AngularFireList<BusinessCard>;

  constructor(
    private authService: AuthService,
    private db: AngularFireDatabase
    ) {
    console.log('CONTACT SERVICE CONSTRUCTOR CALLED');
    this.authService.getUserStatus()
    .subscribe( user => {
        this.userContactsRef = this.db.list<BusinessCard>(`users/${user.uid}/contacts`);
        console.log(`NEW CONTACTS TO WILL BE WRITTEN TO: users/${user.uid}/contacts`);
    });
  }

  getUserContacts(): Observable<BusinessCard[]> {
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

  addNewContact(businessCard: BusinessCard) {
    this.searchFullName(businessCard.firstName, businessCard.lastName).pipe(
      take(1),
    )
    .subscribe( bool => {
      if (!bool) {
        console.log(`ADDING A NEW CONTACT ${businessCard.email}`);
        // tslint:disable-next-line:no-unused-expression
        this.userContactsRef.push(businessCard).key;
      } else {
        console.log(`CONTACT ALREADY EXISTS ${businessCard.email}`);
      }
    });
  }

  getContact(key: string): Observable<BusinessCard> {
    return this.db.object<BusinessCard>(`users/${this.authService.userUid}/contacts/${key}`).valueChanges();
  }

  searchFullName(firstName: string, lastName: string): Observable<boolean> {
    return this.getUserContacts().pipe(
      // tslint:disable-next-line:max-line-length
      map( contacts => contacts.some( contact => contact.firstName.toLocaleLowerCase() === firstName.toLocaleLowerCase() && contact.lastName.toLocaleLowerCase() === lastName.toLocaleLowerCase())
      ),
    );
  }
}
