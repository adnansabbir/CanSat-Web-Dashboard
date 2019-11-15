import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CansatTrackingSavedDataComponent } from './cansat-tracking-saved-data.component';

describe('CansatTrackingSavedDataComponent', () => {
  let component: CansatTrackingSavedDataComponent;
  let fixture: ComponentFixture<CansatTrackingSavedDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CansatTrackingSavedDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CansatTrackingSavedDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
