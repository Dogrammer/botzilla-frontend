import { Component, OnInit } from '@angular/core';
import { EmailContactService } from '../admin-dashboard/services/email-contact.service';
import { IEmailSubject } from '../admin-dashboard/models/email-subject';
import { AbstractControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { take } from 'rxjs/operators';

@Component({
  selector: 'ngx-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {

  emailSubjects : IEmailSubject[] = [];
  isMessageSuccessful: boolean = false;
  
  contactFormGroup: FormGroup = this.formBuilder.group({
    nameOfSender: ['', Validators.required],
    emailAddress: ['', Validators.required],
    body: ['', Validators.required],
    emailSubjectId: [null],
  });

  constructor(private emailContactService: EmailContactService,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getEmailSubjects();
  }

  sendContactEmail() {
    console.log('submit usao');
    
    console.log(this.contactFormGroup.value);
    if(!this.contactFormGroup.valid) {
      return;
    } else {
      this.emailContactService.saveEmailContact(this.contactFormGroup.value).pipe(take(1)).subscribe(data => {
        console.log('odradio servis');
        this.isMessageSuccessful = true;

        
      });
    }
  }

  getEmailSubjects() {
    this.emailContactService.getEmailSubjects().subscribe(
      data => { this.emailSubjects = data;}
    )
  }

  get emailSubjectId(): AbstractControl {
    return this.contactFormGroup.get('emailSubjectId');
  }

  get nameOfSender(): AbstractControl {
    return this.contactFormGroup.get('nameOfSender');
  }

  get body(): AbstractControl {
    return this.contactFormGroup.get('body');
  }

  get emailAddress(): AbstractControl {
    return this.contactFormGroup.get('emailAddress');
  }
  

}
