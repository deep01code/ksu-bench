import { TestBed, inject } from '@angular/core/testing';

import { Gam205Service } from './gam205.service';

describe('Gam205Service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Gam205Service]
    });
  });

  it('should be created', inject([Gam205Service], (service: Gam205Service) => {
    expect(service).toBeTruthy();
  }));
});
