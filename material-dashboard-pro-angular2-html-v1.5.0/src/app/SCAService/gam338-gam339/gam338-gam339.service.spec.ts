import { TestBed, inject } from '@angular/core/testing';

import { Gam338Gam339Service } from './gam338-gam339.service';

describe('Gam338Gam339Service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Gam338Gam339Service]
    });
  });

  it('should be created', inject([Gam338Gam339Service], (service: Gam338Gam339Service) => {
    expect(service).toBeTruthy();
  }));
});
