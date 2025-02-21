import { TestBed, inject } from '@angular/core/testing';

import { GetDataTableService } from './get-data-table.service';

describe('GetDataTableService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetDataTableService]
    });
  });

  it('should be created', inject([GetDataTableService], (service: GetDataTableService) => {
    expect(service).toBeTruthy();
  }));
});
