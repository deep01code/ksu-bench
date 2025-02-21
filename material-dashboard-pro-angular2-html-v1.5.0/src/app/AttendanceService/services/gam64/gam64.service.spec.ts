import { TestBed, inject } from '@angular/core/testing';

import { Gam64Service } from './gam64.service';

describe('Gam64Service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Gam64Service]
    });
  });

  it('should be created', inject([Gam64Service], (service: Gam64Service) => {
    expect(service).toBeTruthy();
  }));
});
