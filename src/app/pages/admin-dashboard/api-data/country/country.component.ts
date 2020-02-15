import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { SmartTableData } from '../../../../@core/interfaces/common/smart-table';
import { environment } from '../../../../../environments/environment';
import { ICountry } from '../../models/country';
import { CountryService } from '../../services/country.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss']
})
export class CountryComponent implements OnInit {
  
  
  settings = {
    add: { 
        confirm: true,
        confirmCreate: true,
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
   
  };

  source: LocalDataSource = new LocalDataSource();
  countries: ICountry[] = [];
  isLoading: boolean = true;

  constructor(private service: SmartTableData,
              private countryService: CountryService,
              private router: Router,

              private http: HttpClient) {
    const data = this.service.getData();
    this.source.load(data);
  }

  ngOnInit() {
    this.getCountries();
  }

  getCountries() {
    this.countryService.getCountries().subscribe(
      data => { this.countries = data; this.isLoading = false; }
    )
  }


  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  onAddConfirm(event): void {
    
    console.log('kurcinaaaa');
    
    this.router.navigate(['/pages/dashboard']);
  }

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



