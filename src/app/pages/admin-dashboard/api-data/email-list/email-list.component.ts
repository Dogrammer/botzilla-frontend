import { Component, OnInit, OnDestroy, ViewChild, TemplateRef } from '@angular/core';
import { EmailContactService } from '../../services/email-contact.service';
import { IEmailContact } from '../../models/email-contact';
import { NbMediaBreakpoint, NbMediaBreakpointsService, NbThemeService, NbDialogService, NbToastrService, NbWindowService } from '@nebular/theme';
import { ModalEmailReplyComponent } from './modal-email-reply/modal-email-reply.component';
import { ToasterConfig } from 'angular2-toaster';

@Component({
  selector: 'ngx-email-list',
  templateUrl: './email-list.component.html',
  styleUrls: ['./email-list.component.scss']
})
export class EmailListComponent implements OnInit, OnDestroy {

  @ViewChild('contentTemplate', { static: true }) contentTemplate: TemplateRef<any>;
  @ViewChild('disabledEsc', { read: TemplateRef, static: true }) disabledEscTemplate: TemplateRef<HTMLElement>;

  

  openWindow(contentTemplate) {
    this.windowService.open(
      contentTemplate,
      {
        title: 'Window content from template',
        context: {
          text: 'some text to pass into template',
        },
      },
    );
  }

  

  breakpoint: NbMediaBreakpoint;
  breakpoints: any;
  themeSubscription: any;
  emailContact : IEmailContact[] = [];
  config: ToasterConfig;

  constructor(private emailContactService: EmailContactService,
              private windowService: NbWindowService,
              private themeService: NbThemeService,
              private toastr: NbToastrService,
              private dialogService: NbDialogService,
              private breakpointService: NbMediaBreakpointsService) {
                this.breakpoints = this.breakpointService.getBreakpointsMap();
    this.themeSubscription = this.themeService.onMediaQueryChange()
      .subscribe(([oldValue, newValue]) => {
        this.breakpoint = newValue;
      }); }
      
  ngOnDestroy() {
    this.themeSubscription.unsubscribe();
  }

  ngOnInit() {
    this.getAllEmails();
  }
  
  getAllEmails() {
    this.emailContactService.getEmails().subscribe(
      data => { this.emailContact = data;}
    )
  }

  openEmailReplyModal(row?, isDelete?) {
    const modalRef = this.dialogService.open(ModalEmailReplyComponent, {
      
      // context: { testVar: this.user}
    }
    );
    if(row){
      modalRef.componentRef.instance.row = row;
      // modalRef.componentRef.instance;
      
      if(isDelete) {
        modalRef.componentRef.instance.modalAction = 'delete'
      }

      else {
        modalRef.componentRef.instance.modalAction = 'edit'
      }

    }
    else {
      // modalRef.componentRef.instance.modalAction = 'add'
    }

    modalRef.onClose.subscribe(onClose => {
      
      if (onClose == 'add') {
        this.toastr.success('You added a new country', 'Success', this.config);
        this.getAllEmails();
      } else if(onClose == 'edit') {
        this.toastr.success('You edited country', 'Success',);
        this.getAllEmails();
      } else if(onClose == 'delete') {
        this.toastr.warning('You deleted country', 'Warning', this.config);
        this.getAllEmails();
      } else {
        this.toastr.warning('You have not added a new country', 'Warning', this.config);
      }
    
    });
  }

  openReplyMessageWindow(id) {
    const modalRef = this.windowService.open(ModalEmailReplyComponent, {title: 'Reply Message', context: {emailId: id} });

    modalRef.onClose.subscribe(onClose => {
      
      this.getAllEmails();
      console.log('kurcina na closu');
      
    
    });
  }

  

}
