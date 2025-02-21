import { TestBed, inject } from '@angular/core/testing';

import { Gam133Service } from './gam133.service';

describe('Gam133Service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Gam133Service]
    });
  });

  it('should be created', inject([Gam133Service], (service: Gam133Service) => {
    expect(service).toBeTruthy();
  }));
});
