import { TestBed, inject } from '@angular/core/testing';

import { Gam7Service } from './gam7.service';

describe('Gam7Service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Gam7Service]
    });
  });

  it('should be created', inject([Gam7Service], (service: Gam7Service) => {
    expect(service).toBeTruthy();
  }));
});
