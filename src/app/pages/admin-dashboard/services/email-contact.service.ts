import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { IEmailContact } from '../models/email-contact';
import { map } from 'rxjs/operators';
import { IEmailSubject } from '../models/email-subject';

@Injectable({
  providedIn: 'root'
})
export class EmailContactService {

  constructor(private http: HttpClient) { }

  private readonly CONTROLER_NAME = 'EmailContact';

  getEmails(): Observable<IEmailContact[]> {
    return this.http.get<IEmailContact[]>(environment.apiUrl + this.CONTROLER_NAME + '/getEmails').pipe(
      map( data => {
        return data
      })
    );
  }

  getEmailSubjects(): Observable<IEmailSubject[]> {
    return this.http.get<IEmailSubject[]>(environment.apiUrl + this.CONTROLER_NAME + '/getEmailSubjects').pipe(
      map( data => {
        return data
      })
    );
  }

  saveEmailContact(contactFormData) {
    return this.http.post(environment.apiUrl + this.CONTROLER_NAME + '/contactSendEmail', contactFormData).pipe(
      map( data => {
        return data
      })
    );
  }

  replyEmailContact(emailSubjectId, contactFormData) {
    let request = {
      emailSubjectId: emailSubjectId,
      contactFormData:  contactFormData
    }
    return this.http.post(environment.apiUrl + this.CONTROLER_NAME + '/contactSendEmail', request).pipe(
      map( data => {
        return data
      })
    );
  }

  deleteEmail(id) {
    return this.http.delete(environment.apiUrl + this.CONTROLER_NAME + '/' + id).pipe(
      map( data => {
        return data
      })
    );
  }

  // saveNews(newsData) {
  //   return this.http.post(environment.apiUrl + this.CONTROLER_NAME + '/news', newsData).pipe(
  //     map( data => {
  //       return data
  //     })
  //   );
  // }

  // editNews(id, newsData) {
  //   return this.http.put(environment.apiUrl + this.CONTROLER_NAME + '/' + id, newsData).pipe(
  //     map( data => {
  //       return data
  //     })
  //   );
  // }

  // deleteNews(id) {
  //   return this.http.delete(environment.apiUrl + this.CONTROLER_NAME + '/' + id).pipe(
  //     map( data => {
  //       return data
  //     })
  //   );
  // }

}
