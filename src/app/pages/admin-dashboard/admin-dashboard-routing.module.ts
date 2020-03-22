import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CountryComponent } from './api-data/country/country.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { EmailListComponent } from './api-data/email-list/email-list.component';

const routes: Routes = [
  {
    path: '',
    component: AdminDashboardComponent,
    children: [
      {
        path: 'country',
        component: CountryComponent,
      },
      {
        path: 'emails',
        component: EmailListComponent,
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminDashboardRoutingModule { }
