import {Component, OnInit} from '@angular/core';
// import {CesiumBalloon.glb} from '../../../../../assets/3d_models';

declare const Cesium: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  default_access_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIwZTkwMTE0NC0xNDI5LTQ0MzEtOGQzMy01NjA3NTA2NzlkMzIiLCJpZCI6MTgxNDQsInNjb3BlcyI6WyJhc3IiLCJnYyJdLCJpYXQiOjE1NzM0MDA3MDl9.gdX9hOVF7dEjO8N2i04QPVthTmfpvdnSk9BvUgU5BCs';
  map: any;
  model: any;

  latitude = 90.407206;
  longitude = 23.7823682;
  altitude = 50;

  constructor() {
  }

  ngOnInit() {
    this.initMap();
    // Cesium.Ion.defaultAccessToken = ''
    // let map = new Cesium.Viewer('cesiumContainer', {
    //   terrainProvider: Cesium.createWorldTerrain()
    // });
  }

  initMap() {
    Cesium.Ion.defaultAccessToken = this.default_access_token;
    const map_options = {
      infoBox: false,
      selectionIndicator: false,
      shadows: true,
      shouldAnimate: true
    };
    this.map = new Cesium.Viewer('cesiumContainer', map_options);
    this.createCanSatModel(this.map, '../../../../../assets/3d_models/CesiumBalloon.glb', [this.latitude, this.longitude, this.altitude]);
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

    setTimeout(() => {
      map.trackedEntity = null;

      // setInterval(() => {
      //   if (this.altitude > 0) {
      //     this.longitude += 0.000001;
      //     this.latitude += 0.000001;
      //     this.altitude -= 0.1;
      //     console.log(this.longitude, this.latitude, this.altitude);
      //     this.model.position = Cesium.Cartesian3.fromDegrees(this.latitude, this.longitude, this.altitude);
      //   }
      // }, 50);
    }, 5000);
  }

}
