import { TestBed, inject } from '@angular/core/testing';

import { Gam340Service } from './gam340.service';

describe('Gam340Service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Gam340Service]
    });
  });

  it('should be created', inject([Gam340Service], (service: Gam340Service) => {
    expect(service).toBeTruthy();
  }));
});
