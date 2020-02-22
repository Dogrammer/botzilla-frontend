/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, Injector, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './@core/core.module';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ThemeModule } from './@theme/theme.module';
import { AuthModule } from './@auth/auth.module';
import { InitUserService } from './@theme/services/init-user.service';

import {
  NbChatModule,
  NbDatepickerModule,
  NbDialogModule,
  NbMenuModule,
  NbSidebarModule,
  NbToastrModule,
  NbWindowModule,
} from '@nebular/theme';
import { PagesModule } from './pages/pages.module';
import { LearnModule } from './pages/learn/learn.module';
import { ModalAoeCountryComponent } from './pages/admin-dashboard/api-data/country/modal-aoe-country/modal-aoe-country.component';
import { CountryComponent } from './pages/admin-dashboard/api-data/country/country.component';
import { AdminDashboardModule } from './pages/admin-dashboard/admin-dashboard.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

export function init_app(injector: Injector) {
  return () =>
    new Promise<any>((resolve: Function) => {
      const initUserService = injector.get(InitUserService);
      initUserService.initCurrentUser().subscribe(() => { },
        () => resolve(), () => resolve()); // a place for logging error
    });
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    PagesModule,
    AdminDashboardModule,

    FormsModule,
    ReactiveFormsModule,

    ThemeModule.forRoot(),
    AuthModule.forRoot(),
    LearnModule,

    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbDialogModule.forRoot(),
    NbWindowModule.forRoot(),
    NbToastrModule.forRoot(),
    NbChatModule.forRoot({
      messageGoogleMapKey: 'AIzaSyA_wNuCzia92MAmdLRzmqitRGvCF7wCZPY',
    }),
    CoreModule.forRoot(),
  ],
  bootstrap: [AppComponent],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: init_app,
      deps: [Injector],
      multi: true,
    },
  ],
  entryComponents : [
    ModalAoeCountryComponent
  ]
})
export class AppModule {
}
