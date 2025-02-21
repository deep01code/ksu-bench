import { TestBed, inject } from '@angular/core/testing';

import { AuthSdkService } from './auth-sdk.service';

describe('AuthSdkService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthSdkService]
    });
  });

  it('should be created', inject([AuthSdkService], (service: AuthSdkService) => {
    expect(service).toBeTruthy();
  }));
});
