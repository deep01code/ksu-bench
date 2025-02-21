import { TestBed, inject } from '@angular/core/testing';

import { RoleGaurdService } from './role-gaurd.service';

describe('RoleGaurdService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RoleGaurdService]
    });
  });

  it('should be created', inject([RoleGaurdService], (service: RoleGaurdService) => {
    expect(service).toBeTruthy();
  }));
});
