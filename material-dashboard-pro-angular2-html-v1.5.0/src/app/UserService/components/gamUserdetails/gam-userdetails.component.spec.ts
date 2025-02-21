import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GamUserdetailsComponent } from './gam-userdetails.component';

describe('GamUserdetailsComponent', () => {
  let component: GamUserdetailsComponent;
  let fixture: ComponentFixture<GamUserdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GamUserdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GamUserdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
