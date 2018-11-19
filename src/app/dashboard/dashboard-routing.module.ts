import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { HistoryComponent } from './history/history.component';

const routes: Routes = [{
  path: '',
  component: DashboardComponent,
  children: [{
    path: 'contacts',
    loadChildren: './contacts/contacts.module#ContactsModule'
  }, {
    path: 'history',
    component: HistoryComponent
  },
  { path: '', redirectTo: 'contacts', pathMatch: 'full' },
  { path: '**', redirectTo: 'contacts' }]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
