/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { VednorApisService } from './VednorApis.service';

describe('Service: VednorApis', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VednorApisService]
    });
  });

  it('should ...', inject([VednorApisService], (service: VednorApisService) => {
    expect(service).toBeTruthy();
  }));
});
