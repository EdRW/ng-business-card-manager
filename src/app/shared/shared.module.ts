import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { NbLayoutModule, NbCardModule, NbButtonModule, NbInputModule } from '@nebular/theme';

const NG_MODULES = [
  CommonModule,
  FormsModule,
];

const FIREBASE_MODULES = [
  AngularFireDatabaseModule,
  AngularFireAuthModule,
];

const NEBULAR_MODULES = [
  NbCardModule,
  NbButtonModule,
  NbInputModule,
  NbLayoutModule,
];


@NgModule({
  declarations: [],
  imports: [...NG_MODULES, ...FIREBASE_MODULES, ...NEBULAR_MODULES],
  exports: [...NG_MODULES, ...FIREBASE_MODULES, ...NEBULAR_MODULES],
})
export class SharedModule { }
