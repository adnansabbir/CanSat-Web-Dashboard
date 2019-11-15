import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CansatTrackingDashboardComponent} from './cansat-tracking-dashboard/cansat-tracking-dashboard.component';
import {CommonComponentsModule} from '../../common-components/common-components.module';
import {CansatTrackingRoutes} from './cansat-tracking.routes';
import {ReactiveFormsModule} from '@angular/forms';
import { MapComponent } from './cansat-tracking-dashboard/map/map.component';
import {CansatTrackingService} from './services/cansat-tracking.service';
import { CansatTrackingSettingsComponent } from './cansat-tracking-settings/cansat-tracking-settings.component';
import { CansatTrackingSavedDataComponent } from './cansat-tracking-saved-data/cansat-tracking-saved-data.component';

@NgModule({
  declarations: [CansatTrackingDashboardComponent, MapComponent, CansatTrackingSettingsComponent, CansatTrackingSavedDataComponent],
  imports: [
    CommonModule,
    CommonComponentsModule,
    CansatTrackingRoutes,
    ReactiveFormsModule
  ],
  providers:[CansatTrackingService]
})
export class CansatTrackingModule {
}
