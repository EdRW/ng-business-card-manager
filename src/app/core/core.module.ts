import { NgModule, ModuleWithProviders, Optional, SkipSelf } from '@angular/core';

import { AngularFireModule } from '@angular/fire';
import { firebaseConfig } from '../../environments/environment.prod';
import { NbThemeModule } from '@nebular/theme';
import { NbAuthModule } from '@nebular/auth';
import { CommonModule } from '@angular/common';
import { OcrService } from './ocr.service';
import { ContactsService } from './contacts.service';
import { HistoryService } from './history.service';

const FIREBASE_PROVIDERS = [
  AngularFireModule.initializeApp(firebaseConfig).providers,
];

const NEBULAR_THEME_PROVIDER = [
  NbThemeModule.forRoot({ name: 'cosmic' }).providers,
  NbAuthModule.forRoot().providers // this is just here so that I can use the styles from nebulars login component
];

@NgModule({
  declarations: [],
  imports: [CommonModule],
  exports: [AngularFireModule, NbThemeModule, NbAuthModule],
  providers: [OcrService, ContactsService, HistoryService],
})
export class CoreModule {
  constructor (@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only');
    }
  }

  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: CoreModule,
      providers: [...FIREBASE_PROVIDERS, ...NEBULAR_THEME_PROVIDER]
    };
  }
}
