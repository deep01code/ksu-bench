import { TestBed, inject } from '@angular/core/testing';

import { Formv2Service } from './formv2.service';

describe('Formv2Service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Formv2Service]
    });
  });

  it('should be created', inject([Formv2Service], (service: Formv2Service) => {
    expect(service).toBeTruthy();
  }));
});
