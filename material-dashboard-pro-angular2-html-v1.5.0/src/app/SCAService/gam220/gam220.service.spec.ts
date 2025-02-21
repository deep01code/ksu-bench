import { TestBed, inject } from '@angular/core/testing';

import { Gam220Service } from './gam220.service';

describe('Gam220Service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Gam220Service]
    });
  });

  it('should be created', inject([Gam220Service], (service: Gam220Service) => {
    expect(service).toBeTruthy();
  }));
});
