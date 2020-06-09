import { Component, OnInit } from '@angular/core';
import { NbMenuService, NbSidebarService } from '@nebular/theme';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  constructor(private nbMenuService: NbMenuService,
    private sidebar: NbSidebarService,
    private router: Router) { }


  ngOnInit() {
    setTimeout(() => this.sidebar.collapse('menu-sidebar'));

  }

}
