import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAoeNewsComponent } from './modal-aoe-news.component';

describe('ModalAoeNewsComponent', () => {
  let component: ModalAoeNewsComponent;
  let fixture: ComponentFixture<ModalAoeNewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalAoeNewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAoeNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
