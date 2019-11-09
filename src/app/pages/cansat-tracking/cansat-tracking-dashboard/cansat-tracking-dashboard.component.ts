import {Component, OnDestroy, OnInit} from '@angular/core';
import {CansatTrackingCards} from '../cansat-tracking.models';

@Component({
  selector: 'app-cansat-tracking-dashboard',
  templateUrl: './cansat-tracking-dashboard.component.html',
  styleUrls: ['./cansat-tracking-dashboard.component.scss']
})
export class CansatTrackingDashboardComponent implements OnInit, OnDestroy {
  browserIsChrome = false;
  browserConnected = false;
  browserConnection = null;
  availablePorts = [];

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

  ngOnDestroy(): void {
    if (this.browserConnection) {
      this.browserConnection.disconnect();
    }
  }

  ngOnInit() {
    // chrome.runtime.sendMessage('kcjgihiihhdcefbgljdpelhjbbbdjolc', {message: 'Connecting via single msg'}, () => {
    //   console.log('Message Sent');
    // });
    this.connectToSerialReader();
  }

  connectToSerialReader() {
    this.browserIsChrome = !!window['chrome'] && (!!window['chrome']['webstore'] || !!window['chrome']['runtime']);
    if (this.browserIsChrome) {
      console.log('Connecting to Chrome App');
      this.browserConnection = window['chrome']['runtime'].connect('kcjgihiihhdcefbgljdpelhjbbbdjolc');
      this.browserConnection.postMessage({sender: 'cansat-tracker'});
      this.browserConnection.onMessage.addListener((msg) => {
        console.log(msg);
        if (msg['establishConnection'] === true) {
          this.browserConnected = true;
        } else if (this.browserConnected && msg['device_list']) {
          this.availablePorts = msg['device_list'];
          this.browserConnection.postMessage({
            port_config: {
              port: 'COM5',
              baudRate: 9600
            }
          })
        }
      });
    }
  }

}
