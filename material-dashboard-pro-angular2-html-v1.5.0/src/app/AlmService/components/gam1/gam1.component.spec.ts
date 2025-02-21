import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Gam1Component } from './gam1.component';

describe('Gam1Component', () => {
  let component: Gam1Component;
  let fixture: ComponentFixture<Gam1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Gam1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Gam1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
