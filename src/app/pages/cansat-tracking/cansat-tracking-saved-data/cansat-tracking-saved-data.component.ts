import {Component, OnInit} from '@angular/core';
import {CansatTrackingService} from '../services/cansat-tracking.service';
import {CanSatDataSet, GpsDataModel, GyroDataModel} from '../cansat-tracking.models';
import {JsonToCsvService} from '../../../common-services/services/json-to-csv.service';

@Component({
  selector: 'app-cansat-tracking-saved-data',
  templateUrl: './cansat-tracking-saved-data.component.html',
  styleUrls: ['./cansat-tracking-saved-data.component.scss']
})
export class CansatTrackingSavedDataComponent implements OnInit {
  canSatData: CanSatDataSet[] = [];
  csvHeaders = {
    altitude: 'Altitude',
    battery_voltage: 'Battery Voltage',
    gps_alt: 'GPS Altitude',
    gps_lat: 'Latitude',
    gps_long: 'Longitude',
    gps_sat_count: 'Satellite Count',
    gps_speed: 'Wind Speed',
    gps_time: 'GPS Time',
    gyro_pitch: 'Pitch',
    gyro_roll: 'Roll',
    gyro_yaw: 'Yaw',
    mission_time: 'Mission Time',
    pressure: 'Air Pressure',
    temp: 'Temperature',
  };

  // altitude: 28.13
  // battery_voltage: 41.89
  // gps_alt: 32
  // gps_lat: 90.39838
  // gps_long: 23.77747
  // gps_sat_count: 1
  // gps_speed: 0.54
  // gps_time: 12305500
  // gyro_pitch: 2
  // gyro_roll: 161
  // gyro_yaw: 217
  // mission_time: 0
  // pressure: 1023
  // temp: 25.25

  constructor(private cansatTrackingService: CansatTrackingService,
              private jsonToCsvService: JsonToCsvService) {
  }

  ngOnInit() {
    this.canSatData = this.cansatTrackingService.getAllCanSatData();
  }

  downloadCsv(_id) {
    const data = this.canSatData.find(obj => obj._id === _id);
    const unNestedData = data ? this.jsonToCsvService.convertNestedObjectArrayToFlatArrayObject(data.data) : null;
    // console.log(unNestedData);
    this.jsonToCsvService.exportCSVFile(this.csvHeaders, unNestedData, data.name)
  }

  deleteData(_id: string) {
    // this.canSatData = this.canSatData.filter(data => data._id !== _id)
    this.cansatTrackingService.deleteCanSatDataById(_id);
    this.canSatData = this.cansatTrackingService.getAllCanSatData();
  }
}
