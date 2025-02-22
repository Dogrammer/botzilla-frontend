/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

import { SmartTableData } from '../../../@core/interfaces/common/smart-table';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'ngx-smart-table',
  templateUrl: './smart-table.component.html',
  styleUrls: ['./smart-table.component.scss'],
})
export class SmartTableComponent {

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
    // columns: {
    //   id: {
    //     title: 'ID',
    //     type: 'number',
    //   },
    //   firstName: {
    //     title: 'First Name',
    //     type: 'string',
    //   },
    //   lastName: {
    //     title: 'Last Name',
    //     type: 'string',
    //   },
    //   login: {
    //     title: 'Login',
    //     type: 'string',
    //   },
    //   email: {
    //     title: 'E-mail',
    //     type: 'string',
    //   },
    //   age: {
    //     title: 'Age',
    //     type: 'number',
    //   },
    // },
    columns: {
      id: {
        title: 'Id',
        type: 'number',
      },
      name: {
        title: 'Name',
        type: 'string',
      },
      
    },
   
  };

  source: LocalDataSource = new LocalDataSource();
  countries: any;
  constructor(private service: SmartTableData,
              private http: HttpClient) {
    const data = this.service.getData();
    this.source.load(data);
  }

  ngOnInit() {
    this.getCountries();
  }

  getCountries(){
    return this.http.get(environment.apiUrl + '/countries').subscribe(response => {
      this.countries = response;
    })
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
}
