import {Routes} from '@angular/router';

import {DashboardComponent} from '../../pages/dashboard/dashboard.component';

export const AdminLayoutRoutes: Routes = [
  {path: 'cansat-tracking', loadChildren: '../../pages/cansat-tracking/cansat-tracking.module#CansatTrackingModule'},
];
