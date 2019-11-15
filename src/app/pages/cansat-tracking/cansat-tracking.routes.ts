import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CansatTrackingDashboardComponent} from './cansat-tracking-dashboard/cansat-tracking-dashboard.component';
import {CansatTrackingSettingsComponent} from './cansat-tracking-settings/cansat-tracking-settings.component';

const routes: Routes = [
  {path: '', component: CansatTrackingDashboardComponent},
  {path: 'settings', component: CansatTrackingSettingsComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class CansatTrackingRoutes {

}
