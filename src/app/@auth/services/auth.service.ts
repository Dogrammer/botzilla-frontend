// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { environment } from '../../../environments/environment';
// import { map } from 'rxjs/operators';
// import { JwtHelperService } from '@auth0/angular-jwt';
// import { IUser } from '../models/user';
// import { IEducationLevel } from '../models/education-level';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//   baseUrl = environment.apiUrl + 'auth/';
//   jwtHelper = new JwtHelperService();
//   decodedToken: any;
//   currentUser: IUser;

//   constructor(
//     private http: HttpClient
//     ) { }

//   login(loginData: any) {
//     return this.http.post(this.baseUrl + 'login', loginData).pipe(
//       map((response: any) => {
//         const user = response;
//         if (user) {
//           console.log('user: ', user);
          
//           localStorage.setItem('token', user.token);
//           // localStorage.setItem('user', JSON.stringify(user.user));
//           this.decodedToken = this.jwtHelper.decodeToken(user.token);
//           console.log(this.decodedToken);
//           console.log(this.decodedToken.role);
          
          
//           // this.currentUser = user.user;
//         }
//         console.log('toke poslije', this.decodedToken);
        
//       })
//     );
    
//   }



//   register(user: IUser) {
//     return this.http.post(this.baseUrl + 'register', user);
//   }

//   loggedIn() {
//     const token = localStorage.getItem('token');
//     return !this.jwtHelper.isTokenExpired(token);
//   }

//   roleMatch(allowedRoles): boolean {
//     let isMatch = false;
//     console.log(this.decodedToken);
    
//     const userRoles = this.decodedToken.role as Array<string>;
//     allowedRoles.forEach(element => {
//       if (userRoles.includes(element)) {
//         isMatch = true;
//         return;
//       }
//     });
//     return isMatch;
//   }

//   getEducationLevels(): Observable<IEducationLevel[]> {
//     return this.http.get<IEducationLevel[]>(this.baseUrl + 'getEducationLevels').pipe(
//       map( data => {
//         return data
//       })
//     );
//   }
// }
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../../environments/environment';
import { IUser } from '../models/user';
import { IEducationLevel } from '../models/education-level';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = environment.apiUrl + 'auth/';
  jwtHelper = new JwtHelperService();
  decodedToken: any;
  currentUser: IUser;
  // photoUrl = new BehaviorSubject<string>('../../assets/user.png');
  // currentPhotoUrl = this.photoUrl.asObservable();

  constructor(private http: HttpClient) {}

  // changeMemberPhoto(photoUrl: string) {
  //   this.photoUrl.next(photoUrl);
  // }
    getEducationLevels(): Observable<IEducationLevel[]> {
    return this.http.get<IEducationLevel[]>(this.baseUrl + 'getEducationLevels').pipe(
      map( data => {
        return data
      })
    );
  }

  login(model: any) {
    return this.http.post(this.baseUrl + 'login', model).pipe(
      map((response: any) => {
        const user = response;
        if (user) {
          localStorage.setItem('token', user.token);
          localStorage.setItem('user', JSON.stringify(user.user));
          localStorage
          this.decodedToken = this.jwtHelper.decodeToken(user.token);
          this.currentUser = user.user;
          // this.changeMemberPhoto(this.currentUser.photoUrl);
        }
      })
    );
  }

  register(user: IUser) {
    return this.http.post(this.baseUrl + 'register', user);
  }

  loggedIn() {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }

  roleMatch(allowedRoles): boolean {
    let isMatch = false;
    var token = localStorage.getItem('token');
    this.decodedToken = this.jwtHelper.decodeToken(token);
    if (!this.decodedToken) {
      return;
    }
    console.log('prosao poslije ifa - nije dobro');
    
    const userRoles = this.decodedToken.role as Array<string>;
    allowedRoles.forEach(element => {
      if (userRoles.includes(element)) {
        isMatch = true;
        return;
      }
    });
    return isMatch;
  }

  vroleMatch(allowedRoles): boolean {
    var isMatch = false;
    var token = localStorage.getItem('token');
    this.decodedToken = this.jwtHelper.decodeToken(token);
    console.log(this.decodedToken);

    if (this.decodedToken){
      console.log(this.decodedToken);
      
      
      if (!this.jwtHelper.isTokenExpired(this.decodedToken)){
        console.log(this.jwtHelper.isTokenExpired(this.decodedToken));
        
        const userRoles = this.decodedToken.role as Array<string>;
        allowedRoles.forEach(element => {
          if (userRoles.includes(element)) {
            isMatch = true;
            return;
          }
        });
      }
    }
    console.log(isMatch);
    
    return isMatch;

  }
}
