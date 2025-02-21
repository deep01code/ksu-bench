import { TestBed, inject } from '@angular/core/testing';

import { Gam883Service } from './gam883.service';

describe('Gam883Service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Gam883Service]
    });
  });

  it('should be created', inject([Gam883Service], (service: Gam883Service) => {
    expect(service).toBeTruthy();
  }));
});
