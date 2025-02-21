import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteUpdateComponent } from './site-update.component';

describe('SiteUpdateComponent', () => {
  let component: SiteUpdateComponent;
  let fixture: ComponentFixture<SiteUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiteUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
