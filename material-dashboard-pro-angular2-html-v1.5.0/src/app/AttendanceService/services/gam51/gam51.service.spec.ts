import { TestBed, inject } from '@angular/core/testing';

import { Gam51Service } from './gam51.service';

describe('Gam51Service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Gam51Service]
    });
  });

  it('should be created', inject([Gam51Service], (service: Gam51Service) => {
    expect(service).toBeTruthy();
  }));
});
