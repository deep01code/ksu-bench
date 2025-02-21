/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SystemDomainService } from './system-domain.service';

describe('Service: SystemDomain', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SystemDomainService]
    });
  });

  it('should ...', inject([SystemDomainService], (service: SystemDomainService) => {
    expect(service).toBeTruthy();
  }));
});
