import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  NB_AUTH_OPTIONS,
  NbAuthSocialLink,
  NbAuthService,
  NbAuthResult,
} from '@nebular/auth';
import { getDeepFromObject } from '../../helpers';
import { NbThemeService, NbToastrService } from '@nebular/theme';
import { EMAIL_PATTERN } from '../constants';
import { InitUserService } from '../../../@theme/services/init-user.service';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class NgxLoginComponent implements OnInit {

  // minLength: number = this.getConfigValue('forms.validation.password.minLength');
  // maxLength: number = this.getConfigValue('forms.validation.password.maxLength');
  // redirectDelay: number = this.getConfigValue('forms.login.redirectDelay');
  // showMessages: any = this.getConfigValue('forms.login.showMessages');
  // strategy: string = this.getConfigValue('forms.login.strategy');
  // socialLinks: NbAuthSocialLink[] = this.getConfigValue('forms.login.socialLinks');
  // rememberMe = this.getConfigValue('forms.login.rememberMe');
  // isEmailRequired: boolean = this.getConfigValue('forms.validation.email.required');
  // isPasswordRequired: boolean = this.getConfigValue('forms.validation.password.required');

  errors: string[] = [];
  messages: string[] = [];
  user: any = {};
  submitted: boolean = false;
  loginForm: FormGroup;
  alive: boolean = true;
  model: any = {};

  get username() {return this.loginForm.get('username'); }
  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }

  constructor(protected service: NbAuthService,
    @Inject(NB_AUTH_OPTIONS) protected options = {},
    protected cd: ChangeDetectorRef,
    protected themeService: NbThemeService,
    private fb: FormBuilder,
    private http: HttpClient,
    protected router: Router,
    private authService: AuthService,
    private toastr: NbToastrService,
    protected initUserService: InitUserService) { }

  ngOnInit(): void {
    this.createLoginForm();
  }
  
  login() {
    console.log('login model', this.model);
    
    this.authService.login(this.loginForm.value).subscribe(next => {
      this.toastr.success('Logged in successfully', 'Success');
    }, error => {
      this.toastr.danger(error);
    }, () => {
      console.log('uso u vanjinu staru');
      
      this.router.navigate(['/pages/news']);
    });
  }

  createLoginForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.authService.decodedToken = null;
    this.authService.currentUser = null;
    this.toastr.info('Logged out', 'Info');
    this.router.navigate(['/pages/news']);
  }
}
