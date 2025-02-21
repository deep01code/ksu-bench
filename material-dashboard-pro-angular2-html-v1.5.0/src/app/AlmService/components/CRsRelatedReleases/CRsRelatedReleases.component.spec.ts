import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestlinktabsComponent } from './testlinktabs.component';

describe('TestlinktabsComponent', () => {
  let component: TestlinktabsComponent;
  let fixture: ComponentFixture<TestlinktabsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestlinktabsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestlinktabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
