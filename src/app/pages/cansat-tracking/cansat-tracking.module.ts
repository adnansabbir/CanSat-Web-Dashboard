import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CansatTrackingDashboardComponent} from './cansat-tracking-dashboard/cansat-tracking-dashboard.component';
import {CommonComponentsModule} from '../../common-components/common-components.module';
import {CansatTrackingRoutes} from './cansat-tracking.routes';
import {ReactiveFormsModule} from '@angular/forms';
import { MapComponent } from './cansat-tracking-dashboard/map/map.component';

@NgModule({
  declarations: [CansatTrackingDashboardComponent, MapComponent],
  imports: [
    CommonModule,
    CommonComponentsModule,
    CansatTrackingRoutes,
    ReactiveFormsModule
  ]
})
export class CansatTrackingModule {
}
