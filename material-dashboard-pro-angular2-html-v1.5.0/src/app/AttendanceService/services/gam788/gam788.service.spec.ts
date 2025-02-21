import { TestBed, inject } from '@angular/core/testing';

import { Gam788Service } from './gam788.service';

describe('Gam788Service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Gam788Service]
    });
  });

  it('should be created', inject([Gam788Service], (service: Gam788Service) => {
    expect(service).toBeTruthy();
  }));
});
