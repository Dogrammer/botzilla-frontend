import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { INews } from '../models/news';
import { environment } from '../../../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private http: HttpClient) { }

  private readonly CONTROLER_NAME = 'News';

  getNews(): Observable<INews[]> {
    return this.http.get<INews[]>(environment.apiUrl + this.CONTROLER_NAME + '/getNews').pipe(
      map( data => {
        return data
      })
    );
  }

  saveNews(newsData) {
    return this.http.post(environment.apiUrl + this.CONTROLER_NAME + '/news', newsData).pipe(
      map( data => {
        return data
      })
    );
  }

  editNews(id, newsData) {
    return this.http.put(environment.apiUrl + this.CONTROLER_NAME + '/' + id, newsData).pipe(
      map( data => {
        return data
      })
    );
  }

  deleteNews(id) {
    return this.http.delete(environment.apiUrl + this.CONTROLER_NAME + '/' + id).pipe(
      map( data => {
        return data
      })
    );
  }

}
