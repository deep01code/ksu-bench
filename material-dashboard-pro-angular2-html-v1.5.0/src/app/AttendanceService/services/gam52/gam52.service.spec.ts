import { TestBed, inject } from '@angular/core/testing';

import { Gam52Service } from './gam52.service';

describe('Gam52Service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Gam52Service]
    });
  });

  it('should be created', inject([Gam52Service], (service: Gam52Service) => {
    expect(service).toBeTruthy();
  }));
});
