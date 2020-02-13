import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-learn',
  template: `
    <router-outlet></router-outlet>
  `,
  styleUrls: ['./learn.component.scss']
})
export class LearnComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
