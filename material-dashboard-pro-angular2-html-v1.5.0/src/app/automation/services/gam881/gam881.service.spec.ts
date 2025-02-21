import { TestBed, inject } from '@angular/core/testing';

import { Gam881Service } from './gam881.service';

describe('Gam881Service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Gam881Service]
    });
  });

  it('should be created', inject([Gam881Service], (service: Gam881Service) => {
    expect(service).toBeTruthy();
  }));
});
