/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ProjectApiService } from './project-api.service';

describe('Service: ProjectApi', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProjectApiService]
    });
  });

  it('should ...', inject([ProjectApiService], (service: ProjectApiService) => {
    expect(service).toBeTruthy();
  }));
});
