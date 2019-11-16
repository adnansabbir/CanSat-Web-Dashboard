import {Component, OnInit} from '@angular/core';
import {CansatTrackingService} from '../services/cansat-tracking.service';
import {CanSatDataSet} from '../cansat-tracking.models';
import {JsonToCsvService} from '../../../common-services/services/json-to-csv.service';

@Component({
  selector: 'app-cansat-tracking-saved-data',
  templateUrl: './cansat-tracking-saved-data.component.html',
  styleUrls: ['./cansat-tracking-saved-data.component.scss']
})
export class CansatTrackingSavedDataComponent implements OnInit {
  canSatData: CanSatDataSet[] = [];

  constructor(private cansatTrackingService: CansatTrackingService,
              private jsonToCsvService: JsonToCsvService) {
  }

  ngOnInit() {
    this.canSatData = this.cansatTrackingService.getAllCanSatData();
    console.log(this.jsonToCsvService.exportCSVFile(null, this.canSatData, 'Export'));
  }

}
