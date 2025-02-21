import { TestBed, inject } from '@angular/core/testing';

import { GamvouchersService } from './gamvouchers.service';

describe('GamvouchersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GamvouchersService]
    });
  });

  it('should be created', inject([GamvouchersService], (service: GamvouchersService) => {
    expect(service).toBeTruthy();
  }));
});
