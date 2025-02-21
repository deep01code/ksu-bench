import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddJobNameComponent } from './add-job-name.component';

describe('AddJobNameComponent', () => {
  let component: AddJobNameComponent;
  let fixture: ComponentFixture<AddJobNameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddJobNameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddJobNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
