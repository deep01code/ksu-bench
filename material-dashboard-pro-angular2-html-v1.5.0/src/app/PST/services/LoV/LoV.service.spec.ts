/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LoVService } from './LoVService';

describe('Service: GeneralDepartment', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoVService]
    });
  });

  it('should ...', inject([LoVService], (service: LoVService) => {
    expect(service).toBeTruthy();
  }));
});
