import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CansatTrackingDashboardComponent} from './cansat-tracking-dashboard/cansat-tracking-dashboard.component';

const routes: Routes = [
  {path: '', component: CansatTrackingDashboardComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class CansatTrackingRoutes {

}
