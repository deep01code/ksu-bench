import { TestBed, inject } from '@angular/core/testing';

import { Gam258Service } from './gam258.service';

describe('Gam258Service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Gam258Service]
    });
  });

  it('should be created', inject([Gam258Service], (service: Gam258Service) => {
    expect(service).toBeTruthy();
  }));
});
