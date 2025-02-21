import { TestBed, inject } from '@angular/core/testing';

import { GamRoleService } from './gam-role.service';

describe('GamRoleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GamRoleService]
    });
  });

  it('should be created', inject([GamRoleService], (service: GamRoleService) => {
    expect(service).toBeTruthy();
  }));
});
