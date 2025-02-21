import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GamRoleMangeComponent } from './gam-role-mange.component';

describe('GamRoleMangeComponent', () => {
  let component: GamRoleMangeComponent;
  let fixture: ComponentFixture<GamRoleMangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GamRoleMangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GamRoleMangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
