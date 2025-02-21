import { TestBed, inject } from '@angular/core/testing';

import { PostpaidPackagesService } from './postpaid-packages.service';

describe('PostpaidPackagesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PostpaidPackagesService]
    });
  });

  it('should be created', inject([PostpaidPackagesService], (service: PostpaidPackagesService) => {
    expect(service).toBeTruthy();
  }));
});
