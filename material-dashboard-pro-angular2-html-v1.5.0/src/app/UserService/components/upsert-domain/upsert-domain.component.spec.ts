import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpsertDomainComponent } from './upsert-domain.component';

describe('UpsertDomainComponent', () => {
  let component: UpsertDomainComponent;
  let fixture: ComponentFixture<UpsertDomainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpsertDomainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpsertDomainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
