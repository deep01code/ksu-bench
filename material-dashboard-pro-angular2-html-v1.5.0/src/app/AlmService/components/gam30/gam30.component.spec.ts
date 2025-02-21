import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Gam30Component } from './gam30.component';

describe('Gam30Component', () => {
  let component: Gam30Component;
  let fixture: ComponentFixture<Gam30Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Gam30Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Gam30Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
