/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbSidebarService } from '@nebular/theme';

@Component({
  selector: 'ngx-one-column-layout',
  styleUrls: ['./one-column.layout.scss'],
  template: `
    <nb-layout windowMode>
      <nb-layout-header style="background-color: red;" fixed>
        <ngx-header></ngx-header>
      </nb-layout-header>

      <nb-sidebar  class="menu-sidebar" tag="menu-sidebar" responsive start>
        <ng-content select="nb-menu"></ng-content>
      </nb-sidebar> 

      


      <!-- <nb-sidebar state="expanded" class="menu-sidebar" tag="menu-sidebar" right>
        <ng-content select="nb-menu"></ng-content>
      </nb-sidebar> -->

      <nb-layout-column>
        <ng-content select="router-outlet"></ng-content>
      </nb-layout-column>

      <nb-layout-footer fixed>
        <ngx-footer></ngx-footer>
      </nb-layout-footer>
    </nb-layout>
  `,
})
export class OneColumnLayoutComponent implements OnInit {

  isSidebarCompact: boolean;
  currentUrl: string = '';
  constructor(route: ActivatedRoute,
    private sidebarService: NbSidebarService,
    private router: Router,
     ) {}
  ngOnInit() {
  }
  
  // checkIfAboutUsPage(): boolean {
  //   if (this.currentUrl === '/pages/about-us') {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }

  // kurcina() {
  //   // this.sidebarService.
  // }

  

}
