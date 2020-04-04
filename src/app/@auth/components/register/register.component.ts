import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NB_AUTH_OPTIONS, NbAuthSocialLink, NbAuthService, NbAuthResult } from '@nebular/auth';
import { getDeepFromObject } from '../../helpers';
import { EMAIL_PATTERN } from '../constants';
import { AuthService } from '../../services/auth.service';
import { NbToastrService } from '@nebular/theme';
import { IUser } from '../../models/user';

@Component({
  selector: 'ngx-register',
  styleUrls: ['./register.component.scss'],
  templateUrl: './register.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgxRegisterComponent implements OnInit {

  // minLength: number = this.getConfigValue('forms.validation.password.minLength');
  // maxLength: number = this.getConfigValue('forms.validation.password.maxLength');
  // isFullNameRequired: boolean = this.getConfigValue('forms.validation.fullName.required');
  // isEmailRequired: boolean = this.getConfigValue('forms.validation.email.required');
  // isPasswordRequired: boolean = this.getConfigValue('forms.validation.password.required');
  // redirectDelay: number = this.getConfigValue('forms.register.redirectDelay');
  // showMessages: any = this.getConfigValue('forms.register.showMessages');
  // strategy: string = this.getConfigValue('forms.register.strategy');
  // socialLinks: NbAuthSocialLink[] = this.getConfigValue('forms.login.socialLinks');

  submitted = false;
  errors: string[] = [];
  messages: string[] = [];
  // user: any = {};
  user: IUser;

  registerForm: FormGroup;
  constructor(protected service: NbAuthService,
    @Inject(NB_AUTH_OPTIONS) protected options = {},
    protected cd: ChangeDetectorRef,
    private fb: FormBuilder,
    private toastr: NbToastrService,
    private authService: AuthService,
    protected router: Router) { }

  get fullName() { return this.registerForm.get('fullName'); }
  get email() { return this.registerForm.get('email'); }
  get password() { return this.registerForm.get('password'); }
  get confirmPassword() { return this.registerForm.get('confirmPassword'); }
  get terms() { return this.registerForm.get('terms'); }

  ngOnInit(): void {
    // const fullNameValidators = [
    // ];
    // this.isFullNameRequired && fullNameValidators.push(Validators.required);

    // const emailValidators = [
    //   Validators.pattern(EMAIL_PATTERN),
    // ];
    // this.isEmailRequired && emailValidators.push(Validators.required);

    // const passwordValidators = [
    //   Validators.minLength(this.minLength),
    //   Validators.maxLength(this.maxLength),
    // ];
    // this.isPasswordRequired && passwordValidators.push(Validators.required);

    // this.registerForm = this.fb.group({
    //   fullName: this.fb.control('', [...fullNameValidators]),
    //   email: this.fb.control('', [...emailValidators]),
    //   password: this.fb.control('', [...passwordValidators]),
    //   confirmPassword: this.fb.control('', [...passwordValidators]),
    //   terms: this.fb.control(''),
    // });

    this.createRegisterForm();
  }

  // register(): void {
  //   this.user = this.registerForm.value;
  //   this.errors = this.messages = [];
  //   this.submitted = true;

  //   this.service.register(this.strategy, this.user).subscribe((result: NbAuthResult) => {
  //     this.submitted = false;
  //     if (result.isSuccess()) {
  //       this.messages = result.getMessages();
  //     } else {
  //       this.errors = result.getErrors();
  //     }

  //     const redirect = result.getRedirect();
  //     if (redirect) {
  //       setTimeout(() => {
  //         return this.router.navigateByUrl(redirect);
  //       }, this.redirectDelay);
  //     }
  //     this.cd.detectChanges();
  //   });
  // }

  // getConfigValue(key: string): any {
  //   return getDeepFromObject(this.options, key, null);
  // }

  register() {
    if (this.registerForm.valid) {
      this.user = Object.assign({}, this.registerForm.value);
      this.authService.register(this.user).subscribe(() => {
        this.toastr.success('Registration successful', 'Success');
      }, error => {
        this.toastr.danger(error);
      }, () => {
        this.authService.login(this.user).subscribe(() => {
          this.router.navigate(['/pages/news']);
        });
      });
    }
  }

  createRegisterForm() {
    this.registerForm = this.fb.group({
      gender: ['male'],
      email: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      confirmPassword: ['', Validators.required]
    }, {validator: this.passwordMatchValidator});
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('confirmPassword').value ? null : {'mismatch': true};
  }

}
