/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ConfirmationModalService } from './confirmation-modal.service';

describe('Service: ConfirmationModal', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConfirmationModalService]
    });
  });

  it('should ...', inject([ConfirmationModalService], (service: ConfirmationModalService) => {
    expect(service).toBeTruthy();
  }));
});
