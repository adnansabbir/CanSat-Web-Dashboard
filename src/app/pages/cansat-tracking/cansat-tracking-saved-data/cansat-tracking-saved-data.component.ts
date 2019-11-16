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
  }

  downloadCsv(_id) {
    const data = this.canSatData.find(obj => obj._id === _id);
    const unNestedData = data ? this.jsonToCsvService.convertNestedObjectArrayToFlatArrayObject(data.data) : null;
    this.jsonToCsvService.exportCSVFile(this.csvHeaders, unNestedData, data.name)
  }

  deleteData(_id: string) {
    // this.canSatData = this.canSatData.filter(data => data._id !== _id)
    this.cansatTrackingService.deleteCanSatDataById(_id);
    this.canSatData = this.cansatTrackingService.getAllCanSatData();
  }
}
