import {Component, NgZone, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {CanSatData, CansatTrackingCards} from '../cansat-tracking.models';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {BehaviorSubject, Subscription} from 'rxjs';

@Component({
  selector: 'app-cansat-tracking-dashboard',
  templateUrl: './cansat-tracking-dashboard.component.html',
  styleUrls: ['./cansat-tracking-dashboard.component.scss']
})
export class CansatTrackingDashboardComponent implements OnInit, OnDestroy, OnChanges {
  browserAppId = 'kcjgihiihhdcefbgljdpelhjbbbdjolc';
  browserIsChrome = false;
  browserConnected = false;
  browserConnection = null;
  serial_port_connected = false;
  availablePorts: string[] = [];
  availableBaudRates: string[] = ['9600'];
  serialConfigForm: FormGroup;
  subscription_list: Subscription[] = [];
  serial_connection_error: string;
  canSatDataSet: CanSatData[] = [];
  canSatData: CanSatData = {
    altitude: 0,
    battery_voltage: 0,
    gps_location: [0, 0],
    gps_time: 0,
    mission_time: 0,
    pressure: 0,
    temp: 0
  };

  cards: CansatTrackingCards[] = [
    {title: 'Mission Time', subtitle: '', icon_class_name: 'nc-watch-time', data_key: 'mission_time'},
    {title: 'GPS Time', subtitle: '', icon_class_name: 'nc-compass-05', data_key: 'gps_time'},
    {title: 'Temperature', subtitle: '', icon_class_name: 'nc-sun-fog-29', data_key: 'temp'},
    {title: 'Pressure', subtitle: '', icon_class_name: 'nc-sound-wave', data_key: 'pressure'},
    {title: 'Altitude', subtitle: '', icon_class_name: 'nc-air-baloon', data_key: 'altitude'},
    {title: 'Battery Voltage', subtitle: '', icon_class_name: 'nc-bulb-63', data_key: 'battery_voltage'},
  ];

  constructor(private zone: NgZone) {
    this.connectToSerialReader();
  }

  ngOnDestroy()
    :
    void {
    if (this.browserConnection
    ) {
      this.browserConnection.disconnect();
    }

    this.subscription_list.map(subscriptions => {
      subscriptions.unsubscribe();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }

  ngOnInit() {
    this.formInit();
    this.subscription_list.push(
      this.serialConfigForm.valueChanges.subscribe(data => {
        console.log(data);
      })
    );
  }

  formInit() {
    this.serialConfigForm = new FormGroup({
      port: new FormControl('', Validators.required),
      baudRate: new FormControl('', Validators.required),
    });
  }

  connectToSerialReader() {
    this.browserIsChrome = !!window['chrome'] && (!!window['chrome']['webstore'] || !!window['chrome']['runtime']);
    if (this.browserIsChrome) {
      try {
        this.browserConnection = window['chrome']['runtime'].connect(this.browserAppId);
        this.browserConnection.postMessage({sender: 'cansat-tracker'});
        this.browserConnection.onMessage.addListener((msg) => {
          this.zone.run(() => {
            this.onMsgReceived(msg);
          });
        });
      } catch (e) {
        console.log(e);
      }
    }
  }

  onMsgReceived(msg) {
    console.log(msg);
    switch (true) {
      case (msg['establishConnection'] === true): {
        this.browserConnected = true;
        break;
      }

      case (this.browserConnected && !!msg['device_list']): {
        this.availablePorts = msg['device_list'];
        break;
      }

      case (this.browserConnected && !!msg['serial_port_status']): {
        this.serial_port_connected = msg['serial_port_status'] === 'connected';
        break;
      }

      case (!!msg['serial_connection_error']): {
        console.log(msg['serial_connection_error']);
        this.serial_connection_error = msg['serial_connection_error'];
        break;
      }

      case (this.browserConnected && !!msg): {
        Object.keys(msg).forEach((key) => {
          if (this.canSatData.hasOwnProperty(key)) {
            this.canSatData[key] = msg[key]
          }
        });
        this.canSatDataSet.push(this.canSatData);
        this.serial_connection_error = null;
      }

      // case this.browserConnected && msg['serial_port_status']: {
      //   this.serial_port_connected = msg['serial_port_status'] === 'connected';
      //   break;
      // }
    }

    // if (msg['establishConnection'] === true) {
    //   this.browserConnected = true;
    // } else if (this.browserConnected && msg['device_list']) {
    //   this.availablePorts = msg['device_list'];
    //   console.log('got New device list ', this.availablePorts);
    // } else if (this.browserConnected && msg['serial_port_status']) {
    //   this.serial_port_connected = msg['serial_port_status'] === 'connected';
    //   console.log(this.serial_port_connected);
    // } else if (msg) {
    //   Object.keys(msg).forEach((key) => {
    //     if (this.canSatData.hasOwnProperty(key)) {
    //       this.canSatData[key] = msg[key]
    //     }
    //   });
    // }
  }

  onConnect() {
    if (this.browserConnected) {
      this.browserConnection.postMessage({
        port_config: this.serialConfigForm.value
      })
    }
  }

  onSerialDisconnect() {
    if (this.browserConnected) {
      this.browserConnection.postMessage({
        disconnect_serial: true
      })
    }
  }

  reloadPorts() {
    if (this.browserConnected) {
      this.browserConnection.postMessage({
        reload_ports: true
      })
    }
  }
}
