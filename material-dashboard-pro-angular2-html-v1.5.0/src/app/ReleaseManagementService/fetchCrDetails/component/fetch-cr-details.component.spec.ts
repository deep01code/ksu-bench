import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FetchCrDetailsComponent } from './fetch-cr-details.component';

describe('FetchCrDetailsComponent', () => {
  let component: FetchCrDetailsComponent;
  let fixture: ComponentFixture<FetchCrDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FetchCrDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FetchCrDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
