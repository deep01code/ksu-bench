import { TestBed, inject } from '@angular/core/testing';

import { GammaLoginService } from './gamma-login.service';

describe('GammaLoginService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GammaLoginService]
    });
  });

  it('should be created', inject([GammaLoginService], (service: GammaLoginService) => {
    expect(service).toBeTruthy();
  }));
});
