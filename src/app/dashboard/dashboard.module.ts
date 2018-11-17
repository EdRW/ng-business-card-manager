import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { CoreModule } from '../core/core.module';
import { AddNewContactComponent } from './add-new-contact/add-new-contact.component';
import { HistoryComponent } from './history/history.component';

@NgModule({
  declarations: [
    DashboardComponent,
    AddNewContactComponent,
    HistoryComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    CoreModule
  ]
})
export class DashboardModule { }
