/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { PagesRoutingModule } from './pages-routing.module';
import { ThemeModule } from '../@theme/theme.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { PagesMenu } from './pages-menu';
import { ECommerceModule } from './e-commerce/e-commerce.module';
import { NbMenuModule, NbCardModule, NbInputModule, NbButtonModule, NbSelectModule } from '@nebular/theme';
import { AuthModule } from '../@auth/auth.module';
import { NewsComponent } from './news/news.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { ProductComponent } from './product/product.component';
import { CourseComponent } from './learn/course/course.component';
import { LectionComponent } from './learn/lection/lection.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const PAGES_COMPONENTS = [
  PagesComponent,
];

@NgModule({
  imports: [
    NbCardModule,
    PagesRoutingModule,
    ThemeModule,
    DashboardModule,
    ReactiveFormsModule,
    FormsModule,
    NbButtonModule,
    NbSelectModule,
    NbInputModule,
    ECommerceModule,
    NbMenuModule,
    MiscellaneousModule,
    AuthModule.forRoot(),
  ],
  declarations: [
    ...PAGES_COMPONENTS,
    NewsComponent,
    AboutUsComponent,
    ContactUsComponent,
    ProductComponent,
    // CourseComponent,
    // LectionComponent,
  ],
  providers: [
    PagesMenu,
  ],
})
export class PagesModule {
}
