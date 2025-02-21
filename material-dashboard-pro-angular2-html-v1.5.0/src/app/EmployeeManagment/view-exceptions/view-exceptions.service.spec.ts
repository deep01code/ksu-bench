import { TestBed, inject } from '@angular/core/testing';

import { ViewExceptionsService } from './view-exceptions.service';

describe('ViewExceptionsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ViewExceptionsService]
    });
  });

  it('should be created', inject([ViewExceptionsService], (service: ViewExceptionsService) => {
    expect(service).toBeTruthy();
  }));
});
