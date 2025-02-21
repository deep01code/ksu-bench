import { TestBed, inject } from '@angular/core/testing';

import { Gam304Service } from './gam304.service';

describe('GamxService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Gam304Service]
    });
  });

  it('should be created', inject([Gam304Service], (service: Gam304Service) => {
    expect(service).toBeTruthy();
  }));
});
