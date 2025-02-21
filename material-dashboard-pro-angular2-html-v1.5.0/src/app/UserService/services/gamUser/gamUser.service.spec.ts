import { TestBed, inject } from '@angular/core/testing';

import { GamUserService } from './gamUser.service';

describe('GamUserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GamUserService]
    });
  });

  it('should be created', inject([GamUserService], (service: GamUserService) => {
    expect(service).toBeTruthy();
  }));
});
