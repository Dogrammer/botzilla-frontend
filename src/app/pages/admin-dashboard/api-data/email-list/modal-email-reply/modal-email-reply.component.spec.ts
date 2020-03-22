import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEmailReplyComponent } from './modal-email-reply.component';

describe('ModalEmailReplyComponent', () => {
  let component: ModalEmailReplyComponent;
  let fixture: ComponentFixture<ModalEmailReplyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalEmailReplyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEmailReplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
