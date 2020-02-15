import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { AdminDashboardRoutingModule } from './admin-dashboard-routing.module';
import { CountryComponent } from './api-data/country/country.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { NbCardModule, NbTreeGridModule, NbIconModule, NbInputModule } from '@nebular/theme';
import { ThemeModule } from '../../@theme/theme.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';

@NgModule({
  declarations: [CountryComponent, AdminDashboardComponent],
  imports: [
    CommonModule,
    AdminDashboardRoutingModule,
    NgxDatatableModule,
    NbCardModule,
    NbTreeGridModule,
    NbIconModule,
    NbInputModule,
    ThemeModule,
    Ng2SmartTableModule,
  ],
})
export class AdminDashboardModule { }
