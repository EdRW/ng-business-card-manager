import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { AddNewContactComponent } from './add-new-contact/add-new-contact.component';

const routes: Routes = [{
  path: '',
  component: DashboardComponent,
  children: [{
    path: 'contacts',
    loadChildren: './contacts/contacts.module#ContactsModule'
  }, {
    path: 'addcontact',
    component: AddNewContactComponent
  },
  { path: '', redirectTo: 'contacts', pathMatch: 'full' },
  { path: '**', redirectTo: 'contacts' }]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
