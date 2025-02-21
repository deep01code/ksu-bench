import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewExceptionsComponent } from './view-exceptions.component';

describe('ViewExceptionsComponent', () => {
  let component: ViewExceptionsComponent;
  let fixture: ComponentFixture<ViewExceptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewExceptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewExceptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
