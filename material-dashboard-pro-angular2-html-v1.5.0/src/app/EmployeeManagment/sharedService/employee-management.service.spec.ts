import { TestBed, inject } from '@angular/core/testing';

import { EmployeeManagementService } from './employee-management.service';

describe('EmployeeManagementService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EmployeeManagementService]
    });
  });

  it('should be created', inject([EmployeeManagementService], (service: EmployeeManagementService) => {
    expect(service).toBeTruthy();
  }));
});
