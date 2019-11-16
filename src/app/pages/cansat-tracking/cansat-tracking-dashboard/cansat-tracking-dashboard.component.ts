import {Component, NgZone, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {AlertMessage, CanSatData, CansatTrackingCards} from '../cansat-tracking.models';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {BehaviorSubject, Subscription} from 'rxjs';
import {CansatTrackingService} from '../services/cansat-tracking.service';

@Component({
  selector: 'app-cansat-tracking-dashboard',
  templateUrl: './cansat-tracking-dashboard.component.html',
  styleUrls: ['./cansat-tracking-dashboard.component.scss']
})
export class CansatTrackingDashboardComponent implements OnInit, OnDestroy, OnChanges {
  browserAppId = '';
  browserIsChrome = false;
  browserConnected = false;
  openDataSaveModel = false;
  browserConnection = null;
  serial_port_connected = false;
  dataRecordStarted = false;
  availablePorts: string[] = [];
  availableBaudRates: string[] = ['9600', '115200'];
  serialConfigForm: FormGroup;
  subscription_list: Subscription[] = [];
  serial_connection_error: string;
  canSatDataSet: CanSatData[] = [];
  canSatData: CanSatData = {
    altitude: 0,
    battery_voltage: 0,
    gps: {
      alt: 0,
      lat: 23.7823682,
      long: 90.407206,
      sat_count: 0,
      speed: 0,
      time: 0,
    },
    gyro: {
      pitch: 0,
      roll: 0,
      yaw: 0,
    },
    mission_time: 0,
    pressure: 0,
    temp: 0
  };

  canSatGpsDataKeyValue: any = {};

  newDataSaveForm: FormControl = new FormControl('');
  alertsToDisplay: AlertMessage[] = [
    {message: 'Chrome App to read Serial Data not available', class: 'alert-warning'}
  ];

  cards: CansatTrackingCards[] = [
    {title: 'Mission Time', subtitle: '', icon_class_name: 'nc-watch-time', data_key: 'mission_time'},
    {title: 'GPS Time', subtitle: '', icon_class_name: 'nc-compass-05', data_key: 'gps_time'},
    {title: 'Temperature', subtitle: '', icon_class_name: 'nc-sun-fog-29', data_key: 'temp'},
    {title: 'Pressure', subtitle: '', icon_class_name: 'nc-sound-wave', data_key: 'pressure'},
    {title: 'Altitude', subtitle: '', icon_class_name: 'nc-air-baloon', data_key: 'altitude'},
    {title: 'Battery Voltage', subtitle: '', icon_class_name: 'nc-bulb-63', data_key: 'battery_voltage'},
  ];

  constructor(private zone: NgZone,
              public cansatTrackingService: CansatTrackingService) {
  }

  ngOnDestroy(): void {
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
    // debugger;
    this.formInit();
    this.browserAppId = this.cansatTrackingService.chromeSerialReaderAppId;
    this.connectToSerialReader();
  }

  formInit() {
    this.serialConfigForm = new FormGroup({
      port: new FormControl('', Validators.required),
      baudRate: new FormControl('', Validators.required),
    });
  }

  connectToSerialReader() {
    this.browserIsChrome = !!window['chrome'] && (!!window['chrome']['webstore'] || !!window['chrome']['runtime']);
    if (!this.browserIsChrome) {
      this.alertsToDisplay.push({message: 'Works only on Chrome Browsers', class: 'alert-warning'})
    }
    if (this.browserIsChrome) {
      try {
        this.browserConnection = window['chrome']['runtime'].connect(this.browserAppId);
        this.browserConnection.postMessage({sender: 'chrome-serial-reader'});
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
    switch (true) {
      case (msg['establishConnection'] === true): {
        this.browserConnected = true;
        this.alertsToDisplay.shift();
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
            this.canSatData[key] = msg[key];
          }
        });

        Object.keys(this.canSatData.gps).forEach(key => {
          this.canSatGpsDataKeyValue[key] = {
            name: key.replace(/_/g, ' ').toUpperCase(),
            value: this.canSatData.gps[key]
          };
        });
        if (this.dataRecordStarted) {
          this.canSatDataSet.push(this.canSatData);
          console.log(this.canSatDataSet);
        }
        this.serial_connection_error = null;
      }
    }
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
      });

      this.dataRecordStarted = false;
    }
  }

  reloadPorts() {
    if (this.browserConnected) {
      this.browserConnection.postMessage({
        reload_ports: true
      })
    }
  }

  onStartRecording() {
    this.canSatDataSet = [];
    this.dataRecordStarted = true;
  }

  onStopRecording() {
    this.dataRecordStarted = false;
    this.openDataSaveModel = true;
    // console.log(this.canSatDataSet);
  }

  onRecordingSave(data) {
    this.openDataSaveModel = false;
    this.cansatTrackingService.storeNewData(this.canSatDataSet, this.newDataSaveForm.value).catch(result => {
      this.alertsToDisplay.push({message: 'Error Saving Data : ' + result, class: 'alert-danger'})
    });
    // console.log(this.newDataSaveForm.value);
  }
}
