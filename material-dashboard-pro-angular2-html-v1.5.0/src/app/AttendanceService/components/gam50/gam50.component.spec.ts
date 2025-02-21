import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Gam50Component } from './gam50.component';

describe('Gam50Component', () => {
  let component: Gam50Component;
  let fixture: ComponentFixture<Gam50Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Gam50Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Gam50Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
