import { Component, OnInit, TemplateRef, Input } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { SmartTableData } from '../../../../@core/interfaces/common/smart-table';
import { environment } from '../../../../../environments/environment';
import { ICountry } from '../../models/country';
import { CountryService } from '../../services/country.service';
import { Router } from '@angular/router';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { ShowcaseDialogComponent } from '../../../modal-overlays/dialog/showcase-dialog/showcase-dialog.component';
import { ModalAoeCountryComponent } from './modal-aoe-country/modal-aoe-country.component';
import { style } from '@angular/animations';
import { Ng2SmartTableComponent } from 'ng2-smart-table/lib/ng2-smart-table.component';
import { ConfirmationModalComponent } from '../../confirmation-modal/confirmation-modal.component';
import { take } from 'rxjs/operators';

@Component({
  selector: 'ngx-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss'],
})
export class CountryComponent implements OnInit {
  smartTable: Ng2SmartTableComponent

  


  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    
    columns: {
      name: {
        title: 'Name',
        type: 'string',
      },
      
    },
    mode: 'external',
   
  };

  source: LocalDataSource = new LocalDataSource();
  countries: ICountry[] = [];
  isLoading: boolean = true;
  canCloseConfirmationModal: boolean = false;

  public user = {
    name: 'Kurac picka dinamo',
    age: 26
    }

    deleteId: any;
    testVar: any;

  constructor(private service: SmartTableData,
              private countryService: CountryService,
              private dialogService: NbDialogService,
              private router: Router,
              private http: HttpClient) {

    // const data = this.service.getData();
    // this.source.load(data);
  }

  ngOnInit() {
    this.getCountries();
    console.log('getCOuntries');
    
  }

  someMethod(event) {
    this.getCountries();
  }

  funct(value) {
    // this.route.navigate('detail:'+value.data.Id)
    }

  getCountries() {
    this.countryService.getCountries().subscribe(
      data => { this.countries = data; this.isLoading = false; }
    )
  }

  openCountryAoeModal(row?, isDelete?) {
    const modalRef = this.dialogService.open(ModalAoeCountryComponent, {
      
      context: { testVar: this.user}
    }
    );
    if(row){
    modalRef.componentRef.instance.modalAction = 'edit'
    }

    if(isDelete){
      modalRef.componentRef.instance.modalAction = 'delete'
    }
    modalRef.componentRef.instance.row = row;
    modalRef.onClose.subscribe(load => this.getCountries());
    //add toastr notification when closing modal.
      
    }

    openWithoutBackdrop(dialog: TemplateRef<any>, row?) {
      const modalRef = this.dialogService.open(
        dialog,
        {
          context: 'Are You sure You want to delete this country ?',
          hasBackdrop: false,
          
        });
        modalRef.onClose.subscribe(cl => this.getCountries() );

        this.deleteId = row.data.id;
        if (this.canCloseConfirmationModal) {
          modalRef.onClose.subscribe(cl => this.getCountries() );
          this.canCloseConfirmationModal = false;
        }
        
        
    }

    deleteCountry() {
      console.log('brišem', this.deleteId);
      
      this.countryService.deleteCountry(this.deleteId).pipe(take(1)).subscribe(data => {
        this.canCloseConfirmationModal = true;
        //toastr message
        
      });
    }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  // openModalForEdit(row) {
  //   const modalRed = this.dialogService.open(ModalAoeCountryComponent, {
  //     context: {
  //       row: this.countries
  //     }
  //   })

  // }

  // onAddConfirm(event): void {
    
  //   console.log('kurcinaaaa');
    
  //   this.router.navigate(['/pages/dashboard']);
  // }

  addRecord(event) {
    console.log('kurcina masna');
    var data = {'name': event.newData.name}
    
    
    console.log(data);
                
	this.countryService.saveCountry(data).subscribe(
        res => {
          console.log(res);
          event.confirm.resolve(event.newData);
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log("Client-side error occured.");
        } else {
          console.log("Server-side error occured.");  
        }
      });
  }
  
}



