import { TestBed, inject } from '@angular/core/testing';

import { Gam85Service } from './gam85.service';

describe('Gam85Service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Gam85Service]
    });
  });

  it('should be created', inject([Gam85Service], (service: Gam85Service) => {
    expect(service).toBeTruthy();
  }));
});
