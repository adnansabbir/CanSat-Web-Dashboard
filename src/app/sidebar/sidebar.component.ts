import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';


export interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}

export interface RouteInfoWithChild {
  path: string;
  title: string;
  icon: string;
  class: string;
  children: RouteInfo[];
}

export const ROUTES: RouteInfoWithChild[] = [
  {
    path: '/cansat-tracking', title: 'CanSat Tracking', icon: 'nc-air-baloon', class: null,
    children: [
      {path: '/cansat-tracking/saved-data', title: 'Saved Data', icon: '', class: ''},
      {path: '/cansat-tracking/settings', title: 'Settings', icon: '', class: ''}
    ]
  },
];

@Component({
  moduleId: module.id,
  selector: 'sidebar-cmp',
  templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
  public menuItems: RouteInfoWithChild[];

  constructor(public router: Router) {

  }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
}
