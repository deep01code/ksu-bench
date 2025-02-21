import { TestBed, inject } from '@angular/core/testing';

import { Gam29Service } from './gam29.service';

describe('Gam29Service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Gam29Service]
    });
  });

  it('should be created', inject([Gam29Service], (service: Gam29Service) => {
    expect(service).toBeTruthy();
  }));
});
