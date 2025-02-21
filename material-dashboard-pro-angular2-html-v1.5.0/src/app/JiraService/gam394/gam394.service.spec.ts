import { TestBed, inject } from '@angular/core/testing';

import { Gam394Service } from './gam394.service';

describe('Gam394Service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Gam394Service]
    });
  });

  it('should be created', inject([Gam394Service], (service: Gam394Service) => {
    expect(service).toBeTruthy();
  }));
});
