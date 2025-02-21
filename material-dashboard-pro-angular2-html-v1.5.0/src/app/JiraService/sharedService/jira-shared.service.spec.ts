import { TestBed, inject } from '@angular/core/testing';

import { JiraSharedService } from './jira-shared.service';

describe('JiraSharedService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JiraSharedService]
    });
  });

  it('should be created', inject([JiraSharedService], (service: JiraSharedService) => {
    expect(service).toBeTruthy();
  }));
});
