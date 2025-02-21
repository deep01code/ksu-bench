import { TestBed, inject } from '@angular/core/testing';

import { DataTableConfigService } from './data-table-config.service';

describe('DataTableConfigService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataTableConfigService]
    });
  });

  it('should be created', inject([DataTableConfigService], (service: DataTableConfigService) => {
    expect(service).toBeTruthy();
  }));
});
