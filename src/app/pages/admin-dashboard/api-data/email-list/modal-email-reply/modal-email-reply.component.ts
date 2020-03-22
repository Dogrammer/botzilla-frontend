import { Component, OnInit, Input } from '@angular/core';
import { IEmailContact } from '../../../models/email-contact';
import { EmailContactService } from '../../../services/email-contact.service';
import { FormBuilder, AbstractControl, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';
import { take } from 'rxjs/operators';

@Component({
  selector: 'ngx-modal-email-reply',
  templateUrl: './modal-email-reply.component.html',
  styleUrls: ['./modal-email-reply.component.scss']
})
export class ModalEmailReplyComponent implements OnInit {

  @Input() row;
  @Input() modalAction;


  
  emailContact : IEmailContact[] = [];
  testVar: any;

  constructor(
    private emailContactService: EmailContactService,
    private formBuilder: FormBuilder,
    protected ref: NbDialogRef<ModalEmailReplyComponent>) {}

    ngOnInit() {
      console.log('row', this.row.data);
      this.getEmails();

      if(this.row.data) {
        this.replyEmailGroup.patchValue({
          emailContactId: this.row.data.id,
        });
      }
    }

    replyEmailGroup: FormGroup = this.formBuilder.group({
      emailContactId: [null],
      body: [null, Validators.required],
    });
    
  dismiss() {
    this.ref.close();
  }

  // getters for reactive form
  get emailContactId(): AbstractControl {
    return this.replyEmailGroup.get('emailContactId');
  }

  get body (): AbstractControl {
    return this.replyEmailGroup.get('body');
  }



  submitCountry() {
    console.log('submit usao');
    
    console.log(this.replyEmailGroup.value);
    if(!this.replyEmailGroup.valid) {
      return;
    } else {
      this.emailContactService.replyEmailContact(this.row.data.id,this.replyEmailGroup.value).pipe(take(1)).subscribe(data => {
        // this.dismiss();
        console.log('odradio servis');
        this.ref.close('add');
        this.getEmails();
        
      });
    }
  }

  getEmails() {
    this.emailContactService.getEmails().subscribe(
      data => { this.emailContact = data; }
    )
  }

}
