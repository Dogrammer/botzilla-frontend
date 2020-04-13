// /*
//  * Copyright (c) Akveo 2019. All Rights Reserved.
//  * Licensed under the Single Application / Multi Application License.
//  * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
//  */

// import { Injectable } from '@angular/core';
// import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
// import { Observable } from 'rxjs';
// import { tap } from 'rxjs/operators';
// import { AuthService } from './services/auth.service';
// import { NbToastrService } from '@nebular/theme';

// @Injectable()
// export class AuthGuard implements CanActivate {
//   constructor(
//     private authService: AuthService,
//     private router: Router,
//     private toastr: NbToastrService,
//     ) {}

//   canActivate(next: ActivatedRouteSnapshot): boolean {
//     console.log('usao u canActivate');
    
//     const roles = next.firstChild.data['roles'] as Array<string>;
//     // const roles = next.data['roles'] as Array<string>;

//     console.log('role:', roles);
    
//     if (roles) {
//       const match = this.authService.roleMatch(roles);
//       console.log('match', match);
      
//       if (match) {
//         console.log('da rola postoji jeej');
//         return true;
        
//       } else {
//         console.log('ne postoji ta rola');
        
//         this.router.navigate(['pages/news']);
//         this.toastr.warning('You are not authorized to access this area', 'Warning');
//       }
//     }

//     if (this.authService.loggedIn()) {
//       return true;
//     }

//     this.toastr.warning('You shall not pass!!!', 'Warning');
//     this.router.navigate(['/home']);
//     return false;
//   }
// }

import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router,
    private toastr: NbToastrService) {}

  canActivate(next: ActivatedRouteSnapshot): boolean {
    const roles = next.firstChild.data['roles'] as Array<string>;
    console.log('rola',roles);
    
    
    if (roles) {
      const match = this.authService.roleMatch(roles);
      console.log('match', match);
      
      if (match) {
        return true;
      } else {
        console.log('not authorized');
        
        this.router.navigate(['pages/news']);
        this.toastr.warning('You are not authorized to access this area', 'Warning');
      }
    }

    if (this.authService.loggedIn()) {
      return true;
    }

    
    
    // this.alertify.error('You shall not pass!!!');
    // this.toastr.danger('You shall not pass', 'Danger');
    // this.router.navigate(['/pages/news']);
    return false;
  }
}
