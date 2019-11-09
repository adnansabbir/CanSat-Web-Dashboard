import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CansatTrackingDashboardComponent } from './cansat-tracking-dashboard.component';

describe('CansatTrackingDashboardComponent', () => {
  let component: CansatTrackingDashboardComponent;
  let fixture: ComponentFixture<CansatTrackingDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CansatTrackingDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CansatTrackingDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
