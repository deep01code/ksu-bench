import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Formv2Component } from './formv2.component';

describe('FormComponentComponent', () => {
  let component: Formv2Component;
  let fixture: ComponentFixture<Formv2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Formv2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Formv2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
