import { TestBed, inject } from '@angular/core/testing';

import { Gam28Service } from './gam28.service';

describe('Gam28Service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Gam28Service]
    });
  });

  it('should be created', inject([Gam28Service], (service: Gam28Service) => {
    expect(service).toBeTruthy();
  }));
});
