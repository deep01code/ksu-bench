import { TestBed, inject } from '@angular/core/testing';

import { Gam4Service } from './gam4.service';

describe('Gam4Service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Gam4Service]
    });
  });

  it('should be created', inject([Gam4Service], (service: Gam4Service) => {
    expect(service).toBeTruthy();
  }));
});
