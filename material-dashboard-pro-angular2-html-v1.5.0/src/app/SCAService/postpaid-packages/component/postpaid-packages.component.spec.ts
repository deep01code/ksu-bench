import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostpaidPackagesComponent } from './postpaid-packages.component';

describe('PostpaidPackagesComponent', () => {
  let component: PostpaidPackagesComponent;
  let fixture: ComponentFixture<PostpaidPackagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostpaidPackagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostpaidPackagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
