import { TestBed, inject } from '@angular/core/testing';

import { ReleaseManagementService } from './release-management.service';

describe('ReleaseManagementService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReleaseManagementService]
    });
  });

  it('should be created', inject([ReleaseManagementService], (service: ReleaseManagementService) => {
    expect(service).toBeTruthy();
  }));
});
