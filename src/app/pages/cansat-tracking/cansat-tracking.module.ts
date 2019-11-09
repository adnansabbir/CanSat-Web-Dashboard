import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CansatTrackingDashboardComponent} from './cansat-tracking-dashboard/cansat-tracking-dashboard.component';
import {CommonComponentsModule} from '../../common-components/common-components.module';
import {CansatTrackingRoutes} from './cansat-tracking.routes';

@NgModule({
  declarations: [CansatTrackingDashboardComponent],
  imports: [
    CommonModule,
    CommonComponentsModule,
    CansatTrackingRoutes
  ]
})
export class CansatTrackingModule {
}
