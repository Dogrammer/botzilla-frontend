import { Component, OnInit, OnDestroy } from '@angular/core';
import { NbThemeService, NbMediaBreakpointsService, NbMediaBreakpoint } from '@nebular/theme';
import { NewsService } from '../admin-dashboard/services/news.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'ngx-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit,OnDestroy {

  breakpoint: NbMediaBreakpoint;
  breakpoints: any;
  themeSubscription: any;
  imageSrc: any;
  imageData: any;

  news : any;
  constructor(private themeService: NbThemeService,
              private sanitizer : DomSanitizer,
              private newsService: NewsService,
              private breakpointService: NbMediaBreakpointsService) {

    this.breakpoints = this.breakpointService.getBreakpointsMap();
    this.themeSubscription = this.themeService.onMediaQueryChange()
      .subscribe(([oldValue, newValue]) => {
        this.breakpoint = newValue;
      });
  }

  ngOnDestroy() {
    this.themeSubscription.unsubscribe();
  }

  ngOnInit() {
    this.getNews();
  }

//   public showImageUrl(blob) {
//     var base64data = null;
//     const reader = new FileReader();
//     reader.readAsDataURL(blob);
//     reader.onloadend = function() {
//       base64data = reader.result;
//     }

//     let mySrc = this.sanitizer.bypassSecurityTrustUrl('data:image/png;base64,' + base64data);
//     this.imageSrc = mySrc;
//     return mySrc;
// }


  getNews() {
    this.newsService.getNews().subscribe(
      data => {
      }

    )
  }



   


}
