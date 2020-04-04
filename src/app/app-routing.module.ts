import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuard } from './@auth/auth.guard';
import {PagesModule} from './pages/pages.module';

const routes: Routes = [
  // {
  //   path: 'learn',
  //   loadChildren: () => import('./pages/learn/learn.module')
  //     .then(m => m.LearnModule),
  // },
  {
    path: 'pages',
    // canActivate: [AuthGuard],
    loadChildren: () => import('./pages/pages.module')
      .then(m => m.PagesModule),
  },
  {
    path: 'auth',
    loadChildren: () => import('./@auth/auth.module')
      .then(m => m.AuthModule),
  },
  
  { path: '', redirectTo: 'pages', pathMatch: 'full' },
  { path: '**', redirectTo: '' },
];

const config: ExtraOptions = {
  useHash: false,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
