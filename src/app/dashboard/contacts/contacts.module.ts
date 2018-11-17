import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactsRoutingModule } from './contacts-routing.module';
import { ContactListComponent } from './contact-list/contact-list.component';
import { ContactDetailsComponent } from './contact-details/contact-details.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [ContactListComponent, ContactDetailsComponent],
  imports: [
    CommonModule,
    ContactsRoutingModule,
    SharedModule
  ]
})
export class ContactsModule { }
