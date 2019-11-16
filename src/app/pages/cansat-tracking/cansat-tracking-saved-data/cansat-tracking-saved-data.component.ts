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
    gps: 'GPS Data',
    gyro: 'Gyro Data',
    mission_time: 'Mission Time',
    pressure: 'Air Pressure',
    temp: 'Temperature'
  };

  constructor(private cansatTrackingService: CansatTrackingService,
              private jsonToCsvService: JsonToCsvService) {
  }

  ngOnInit() {
    this.canSatData = this.cansatTrackingService.getAllCanSatData();
    // this.jsonToCsvService.exportCSVFile(this.csvHeaders, this.canSatData[0].data, this.canSatData[0].name);
    // console.log(this.jsonToCsvService.convertNestedObjectArrayToFlatArrayObject(this.canSatData[0].data));
  }

  downloadCsv(_id) {
    const data = this.canSatData.find(obj => obj._id === _id);
    const unNestedData = data ? this.jsonToCsvService.convertNestedObjectArrayToFlatArrayObject(data.data) : null;
    this.jsonToCsvService.exportCSVFile(this.csvHeaders, unNestedData, data.name)
  }
}
