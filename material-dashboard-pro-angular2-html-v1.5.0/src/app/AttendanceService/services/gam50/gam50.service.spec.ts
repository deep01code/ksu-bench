import { TestBed, inject } from '@angular/core/testing';

import { Gam50Service } from './gam50.service';

describe('Gam50Service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Gam50Service]
    });
  });

  it('should be created', inject([Gam50Service], (service: Gam50Service) => {
    expect(service).toBeTruthy();
  }));
});
