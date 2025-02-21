import { TestBed, inject } from '@angular/core/testing';

import { PrepaidVoucherService } from './prepaid-voucher.service';

describe('PrepaidVoucherService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PrepaidVoucherService]
    });
  });

  it('should be created', inject([PrepaidVoucherService], (service: PrepaidVoucherService) => {
    expect(service).toBeTruthy();
  }));
});
