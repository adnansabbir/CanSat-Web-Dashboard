import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CansatTrackingDashboardComponent} from './cansat-tracking-dashboard/cansat-tracking-dashboard.component';
import {CansatTrackingSettingsComponent} from './cansat-tracking-settings/cansat-tracking-settings.component';
import {CansatTrackingSavedDataComponent} from './cansat-tracking-saved-data/cansat-tracking-saved-data.component';

const routes: Routes = [
  {path: '', component: CansatTrackingDashboardComponent},
  {path: 'settings', component: CansatTrackingSettingsComponent},
  {path: 'saved-data', component: CansatTrackingSavedDataComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class CansatTrackingRoutes {

}
