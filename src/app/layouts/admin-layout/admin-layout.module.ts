import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {AdminLayoutRoutes} from './admin-layout.routing';

import {DashboardComponent} from '../../pages/dashboard/dashboard.component';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {CansatTrackingModule} from '../../pages/cansat-tracking/cansat-tracking.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    NgbModule,
    // CansatTrackingModule
  ],
  declarations: [
    DashboardComponent
  ]
})

export class AdminLayoutModule {
}
