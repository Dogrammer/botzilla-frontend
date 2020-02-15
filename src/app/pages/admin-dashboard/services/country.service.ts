import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ICountry } from '../models/country';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(private http: HttpClient) { }

  private readonly CONTROLER_NAME = 'Country';

  getCountries(): Observable<ICountry[]> {
    return this.http.get<ICountry[]>(environment.apiUrl + this.CONTROLER_NAME + '/getCountries').pipe(
      map( data => {
        return data
      })
    );
  }

  saveCountry(countryData) {
    return this.http.post(environment.apiUrl + this.CONTROLER_NAME + '/countries', countryData).pipe(
      map( data => {
        return data
      })
    );
  }

  editCountry(id, countryData) {
    return this.http.put(environment.apiUrl + this.CONTROLER_NAME + '/' + id, countryData).pipe(
      map( data => {
        return data
      })
    );
  }

  deleteCountry(id) {
    return this.http.delete(environment.apiUrl + this.CONTROLER_NAME + '/' + id).pipe(
      map( data => {
        return data
      })
    );
  }


}
