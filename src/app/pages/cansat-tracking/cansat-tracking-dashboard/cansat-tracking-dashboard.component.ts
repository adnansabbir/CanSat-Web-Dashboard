import {Component, OnInit} from '@angular/core';
import {CansatTrackingCards} from '../cansat-tracking.models';

@Component({
  selector: 'app-cansat-tracking-dashboard',
  templateUrl: './cansat-tracking-dashboard.component.html',
  styleUrls: ['./cansat-tracking-dashboard.component.scss']
})
export class CansatTrackingDashboardComponent implements OnInit {
  cards: CansatTrackingCards[] = [
    {title: 'Mission Time', subtitle: '2 min, 25 sec', icon_class_name: 'nc-watch-time'},
    {title: 'GPS Time', subtitle: '', icon_class_name: 'nc-compass-05'},
    {title: 'Temperature', subtitle: '', icon_class_name: 'nc-sun-fog-29'},
    {title: 'Pressure', subtitle: '', icon_class_name: 'nc-sound-wave'},
    {title: 'Altitude', subtitle: '', icon_class_name: 'nc-air-baloon'},
    {title: 'Battery Voltage', subtitle: '', icon_class_name: 'nc-bulb-63'},
  ];

  constructor() {
  }

  ngOnInit() {
  }

}
