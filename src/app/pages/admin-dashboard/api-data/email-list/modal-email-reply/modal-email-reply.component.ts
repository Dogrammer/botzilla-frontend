import { Component, OnInit, Input } from '@angular/core';
import { IEmailContact } from '../../../models/email-contact';
import { EmailContactService } from '../../../services/email-contact.service';
import { FormBuilder, AbstractControl, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef, NbWindowRef, NbToastrService } from '@nebular/theme';
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
  emailId: any;

  constructor(
    private emailContactService: EmailContactService,
    private toaster: NbToastrService,
    public windowRef: NbWindowRef,
    private formBuilder: FormBuilder,
    ) {}

    ngOnInit() {
      // console.log('row', this.row.data);
      this.getEmails();
      console.log(this.row);
      console.log(this.emailId);
      
      
      

      // if(this.row.data) {
      //   this.replyEmailGroup.patchValue({
      //     emailContactId: this.row.data.id,
      //   });
      // }
    }

    replyEmailGroup: FormGroup = this.formBuilder.group({
      body: [null, Validators.required],
    });
    
  

  close() {
    this.windowRef.close();
  }

  minimize() {
    this.windowRef.minimize();
  }

  // getters for reactive form
  get emailContactId(): AbstractControl {
    return this.replyEmailGroup.get('emailContactId');
  }

  get body (): AbstractControl {
    return this.replyEmailGroup.get('body');
  }

  submitEmail() {
    console.log('submit usao');
    console.log(this.replyEmailGroup.value);
    if(!this.replyEmailGroup.valid) {
      return;
    } else {
      this.emailContactService.replyEmailContact(this.emailId, this.replyEmailGroup.value).pipe(take(1)).subscribe(data => {
        // this.dismiss();
        console.log('odradio servis');
        this.close();
        // this.windowRef.
        this.toaster.success("Your message has been sent successfully", "Success")
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
