import { TestBed, inject } from '@angular/core/testing';

import { Gam1Service } from './gam1.service';

describe('Gam1Service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Gam1Service]
    });
  });

  it('should be created', inject([Gam1Service], (service: Gam1Service) => {
    expect(service).toBeTruthy();
  }));
});
