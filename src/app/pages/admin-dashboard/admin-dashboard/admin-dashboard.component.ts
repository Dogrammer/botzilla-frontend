import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-admin-dashboard',
  template: `
    <router-outlet></router-outlet>
  `,
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
