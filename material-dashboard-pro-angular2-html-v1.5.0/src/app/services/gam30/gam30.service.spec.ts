import { TestBed, inject } from '@angular/core/testing';

import { Gam30Service } from './gam30.service';

describe('Gam30Service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Gam30Service]
    });
  });

  it('should be created', inject([Gam30Service], (service: Gam30Service) => {
    expect(service).toBeTruthy();
  }));
});
