import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GamUserMangeComponent } from './gam-user-mange.component';

describe('GamUserMangeComponent', () => {
  let component: GamUserMangeComponent;
  let fixture: ComponentFixture<GamUserMangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GamUserMangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GamUserMangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
