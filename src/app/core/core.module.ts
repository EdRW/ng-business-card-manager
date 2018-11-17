import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { firebaseConfig } from '../../environments/environment';
import { NbThemeModule, NbLayoutModule, NbCardModule, NbButtonModule, NbInputModule } from '@nebular/theme';

const NG_MODULES = [
  CommonModule,
  FormsModule
];

const FIREBASE_MODULES = [
  AngularFireDatabaseModule,
  AngularFireAuthModule,
];

const FIREBASE_PROVIDERS = [
  AngularFireModule.initializeApp(firebaseConfig).providers,
];

const NEBULAR_MODULES = [
  NbCardModule,
  NbButtonModule,
  NbInputModule,
  NbLayoutModule,
];

const NEBULAR_THEME_PROVIDER = [
  NbThemeModule.forRoot({ name: 'cosmic' }).providers,
];

@NgModule({
  declarations: [],
  imports: [...NG_MODULES, ...FIREBASE_MODULES, ...NEBULAR_MODULES],
  exports: [...NG_MODULES, ...FIREBASE_MODULES, ...NEBULAR_MODULES],
})
export class CoreModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: CoreModule,
      providers: [...FIREBASE_PROVIDERS, ...NEBULAR_THEME_PROVIDER]
    };
  }
}
