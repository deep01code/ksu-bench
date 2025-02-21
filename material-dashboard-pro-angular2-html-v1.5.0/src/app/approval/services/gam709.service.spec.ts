import { TestBed, inject } from '@angular/core/testing';

import { Gam709Service } from './gam709.service';

describe('Gam709Service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Gam709Service]
    });
  });

  it('should be created', inject([Gam709Service], (service: Gam709Service) => {
    expect(service).toBeTruthy();
  }));
});

