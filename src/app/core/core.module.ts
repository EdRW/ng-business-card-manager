import { NgModule, ModuleWithProviders } from '@angular/core';

import { AngularFireModule } from '@angular/fire';
import { firebaseConfig } from '../../environments/environment';
import { NbThemeModule } from '@nebular/theme';
import { NbAuthModule } from '@nebular/auth';
import { CommonModule } from '@angular/common';

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
  exports: [AngularFireModule, NbThemeModule, NbAuthModule]
})
export class CoreModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: CoreModule,
      providers: [...FIREBASE_PROVIDERS, ...NEBULAR_THEME_PROVIDER]
    };
  }
}
