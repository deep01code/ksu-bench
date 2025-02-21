import { TestBed, inject } from '@angular/core/testing';

import { Gam704Service } from './gam704.service';

describe('Gam704Service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Gam704Service]
    });
  });

  it('should be created', inject([Gam704Service], (service: Gam704Service) => {
    expect(service).toBeTruthy();
  }));
});
