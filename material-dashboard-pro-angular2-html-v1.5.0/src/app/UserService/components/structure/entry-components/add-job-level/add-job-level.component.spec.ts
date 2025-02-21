import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddJobLevelComponent } from './add-job-level.component';

describe('AddJobLevelComponent', () => {
  let component: AddJobLevelComponent;
  let fixture: ComponentFixture<AddJobLevelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddJobLevelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddJobLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
