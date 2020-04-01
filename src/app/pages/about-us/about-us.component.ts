import { Component, OnInit, OnDestroy } from '@angular/core';
import { NbMenuService, NbSidebarService } from '@nebular/theme';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'ngx-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit, OnDestroy {

  isCollapsed: boolean;
  constructor(private nbMenuService: NbMenuService,
              private sidebar: NbSidebarService,
              private router: Router) { }

  ngOnInit() {
    setTimeout(() => this.sidebar.collapse('menu-sidebar'));

    // this.nbMenuService.onItemSelect().subscribe((event: {tag: string, item: any}) => { this.sidebar.toggle(false, 'menu-sidebar'); console.log('ajdee');
    //  });
    // this.sidebar.collapse('menu-sidebar');
    // console.log('kurcina masna'); //ovo se izvrši ok mozes nastavit xd
    //   this.sidebar.toggle(false, 'menu-sidebar');   // ovo ne

    this.sidebar.onToggle().subscribe((data: {compact: boolean, tag: string}) => {
      this.isCollapsed = true;
      console.log('compact: ', data.compact, 'tag:', data.tag);
    });
    
  }

  ngOnDestroy() {
    console.log('destroyam ti staru');
    
  }




  checkUrl() {
      this.sidebar.toggle(false, 'menu-sidebar');
      this.sidebar.onToggle().subscribe((data: { compact: boolean, tag: string }) => {
        this.isCollapsed = true;
        console.log('iscollapsed check', this.isCollapsed);
      });
  }

  close(){
    this.sidebar.onCollapse().subscribe(response => {
      this.isCollapsed = true;
      console.log('kurcina masna');
      
    })
  }

}
