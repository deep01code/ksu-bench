import { TestBed, inject } from '@angular/core/testing';

import { Gam6Service } from './gam6.service';

describe('Gam6Service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Gam6Service]
    });
  });

  it('should be created', inject([Gam6Service], (service: Gam6Service) => {
    expect(service).toBeTruthy();
  }));
});
