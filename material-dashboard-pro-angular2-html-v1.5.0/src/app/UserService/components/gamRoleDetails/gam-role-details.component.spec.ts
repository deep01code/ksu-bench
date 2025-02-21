import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GamRoleDetailsComponent } from './gam-role-details.component';

describe('GamRoleDetailsComponent', () => {
  let component: GamRoleDetailsComponent;
  let fixture: ComponentFixture<GamRoleDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GamRoleDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GamRoleDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
