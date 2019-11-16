import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {CansatTrackingService} from '../../services/cansat-tracking.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, OnChanges {
  map: any;
  model: any;

  @Input() model_latitude = 23.7825;
  @Input() model_longitude = 90.40723;
  @Input() model_altitude = 0;
  @Input() altitude_offset = 0;

  constructor(private cansatTrackingService: CansatTrackingService) {
  }

  ngOnInit() {
    this.initMap();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ((changes['model_latitude'] || changes['model_longitude'] || changes['model_altitude']) && this.model) {
      console.log(this.model_altitude);
      this.model.position = Cesium.Cartesian3.fromDegrees(this.model_longitude.toFixed(6),
        this.model_latitude.toFixed(6),
        this.model_altitude >= this.altitude_offset ? this.model_altitude - this.altitude_offset : this.model_altitude);
    }
  }

  initMap() {
    Cesium.Ion.defaultAccessToken = this.cansatTrackingService.mapOptions.access_token;
    const map_options = {
      infoBox: false,
      selectionIndicator: false,
      shadows: true,
      shouldAnimate: true
    };
    this.map = new Cesium.Viewer('cesiumContainer', map_options);
    this.createCanSatModel(this.map, this.cansatTrackingService.mapOptions.model_url,
      [this.model_longitude, this.model_latitude, this.model_altitude]);
  }

  createCanSatModel(map, url, coordinate) {
    map.entities.removeAll();

    const position = Cesium.Cartesian3.fromDegrees(coordinate[0], coordinate[1], coordinate[2]);
    const heading = Cesium.Math.toRadians(135);
    const pitch = 0;
    const roll = 0;
    const hpr = new Cesium.HeadingPitchRoll(heading, pitch, roll);
    const orientation = Cesium.Transforms.headingPitchRollQuaternion(position, hpr);
    this.model = map.entities.add({
      name: url,
      position: position,
      orientation: orientation,
      model: {
        uri: url,
        minimumPixelSize: 128,
        maximumScale: 5000
      }
    });

    map.trackedEntity = this.model;

    // setTimeout(() => {
    //   map.trackedEntity = null;
    //
    //   // setInterval(() => {
    //   //   if (this.altitude > 0) {
    //   //     this.longitude += 0.000001;
    //   //     this.latitude += 0.000001;
    //   //     this.altitude -= 0.1;
    //   //     console.log(this.longitude, this.latitude, this.altitude);
    //   //     this.model.position = Cesium.Cartesian3.fromDegrees(this.latitude, this.longitude, this.altitude);
    //   //   }
    //   // }, 50);
    // }, 5000);
  }

}
