import { TestBed, inject } from '@angular/core/testing';

import { Gam86Service } from './gam86.service';

describe('Gam86Service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Gam86Service]
    });
  });

  it('should be created', inject([Gam86Service], (service: Gam86Service) => {
    expect(service).toBeTruthy();
  }));
});
