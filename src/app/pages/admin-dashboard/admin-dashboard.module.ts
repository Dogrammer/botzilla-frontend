import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { AdminDashboardRoutingModule } from './admin-dashboard-routing.module';
import { CountryComponent } from './api-data/country/country.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { NbCardModule, NbTreeGridModule, NbIconModule, NbInputModule, NbDialogModule, NbDialogRef, NbButtonModule, NbActionsModule, NbCheckboxModule, NbRadioModule, NbSelectModule, NbWindowModule, NbToastrModule } from '@nebular/theme';
import { ThemeModule } from '../../@theme/theme.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ModalAoeCountryComponent } from './api-data/country/modal-aoe-country/modal-aoe-country.component';
import { DialogComponent } from '../modal-overlays/dialog/dialog.component';
import { ShowcaseDialogComponent } from '../modal-overlays/dialog/showcase-dialog/showcase-dialog.component';
import { PagesModule } from '../pages.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ConfirmationModalComponent } from './confirmation-modal/confirmation-modal.component';
import { NewsComponent } from './api-data/news/news.component';
import { ModalAoeNewsComponent } from './api-data/news/modal-aoe-news/modal-aoe-news.component';

@NgModule({
  declarations: [CountryComponent, AdminDashboardComponent, ModalAoeCountryComponent, ConfirmationModalComponent, NewsComponent, ModalAoeNewsComponent],
  imports: [
    CommonModule,
    AdminDashboardRoutingModule,
    NgxDatatableModule,
    NbCardModule,
    NbTreeGridModule,
    NbIconModule,
    NbButtonModule,
    NbActionsModule,
    NbCheckboxModule,
    NbRadioModule,
    NbSelectModule,
    NbIconModule,
    ReactiveFormsModule,
    FormsModule,

    NbInputModule,
    NbDialogModule.forRoot(),
 
    NbWindowModule.forChild(),

    ThemeModule,
    Ng2SmartTableModule,
    // PagesModule,ShowcaseDialogComponent 
  ],
  // providers: [{
  //   provide: NbDialogRef,
  //   useValue: {
  //     close: (dialogResult: any) => { }
  //   }
  // }],
  entryComponents: [
    ModalAoeCountryComponent,
    

  ],
  
  
})
export class AdminDashboardModule { }
