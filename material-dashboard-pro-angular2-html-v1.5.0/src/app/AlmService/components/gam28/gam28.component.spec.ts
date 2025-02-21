import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Gam28Component } from './gam28.component';

describe('Gam28Component', () => {
  let component: Gam28Component;
  let fixture: ComponentFixture<Gam28Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Gam28Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Gam28Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
