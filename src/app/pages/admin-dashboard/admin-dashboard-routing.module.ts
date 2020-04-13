import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CountryComponent } from './api-data/country/country.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { EmailListComponent } from './api-data/email-list/email-list.component';
import { AuthGuard } from '../../@auth/auth.guard';
import { NotFoundComponent } from '../miscellaneous/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    component: AdminDashboardComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'country',
        component: CountryComponent,
        data: {roles: ['Admin']},

      },
      {
        path: 'emails',
        component: EmailListComponent,
        data: {roles: ['Admin']},

      },
      {
        path: '',
        redirectTo: 'pages/about-us',
        pathMatch: 'full',
      },
      {
        path: '**',
        redirectTo: 'pages/news',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminDashboardRoutingModule { }
