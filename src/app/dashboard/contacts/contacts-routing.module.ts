import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactListComponent } from './contact-list/contact-list.component';
import { ContactDetailsComponent } from './contact-details/contact-details.component';
import { AddNewContactComponent } from './add-new-contact/add-new-contact.component';

const routes: Routes = [{
  path: '',
  component: ContactListComponent
}, {
  path: 'details',
  component: ContactDetailsComponent
}, {
  path: 'add',
  component: AddNewContactComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactsRoutingModule { }
