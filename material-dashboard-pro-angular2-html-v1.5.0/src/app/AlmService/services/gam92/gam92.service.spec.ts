import { TestBed, inject } from '@angular/core/testing';

import { Gam92Service } from './gam92.service';

describe('Gam92Service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Gam92Service]
    });
  });

  it('should be created', inject([Gam92Service], (service: Gam92Service) => {
    expect(service).toBeTruthy();
  }));
});
