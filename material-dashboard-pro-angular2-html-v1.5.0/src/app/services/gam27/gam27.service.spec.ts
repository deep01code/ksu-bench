import { TestBed, inject } from '@angular/core/testing';

import { Gam27Service } from './gam27.service';

describe('Gam27Service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Gam27Service]
    });
  });

  it('should be created', inject([Gam27Service], (service: Gam27Service) => {
    expect(service).toBeTruthy();
  }));
});
