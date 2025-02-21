import { TestBed, inject } from '@angular/core/testing';

import { Gam91Service } from './gam91.service';

describe('Gam91Service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Gam91Service]
    });
  });

  it('should be created', inject([Gam91Service], (service: Gam91Service) => {
    expect(service).toBeTruthy();
  }));
});
