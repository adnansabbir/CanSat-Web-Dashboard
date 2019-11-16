import {Injectable} from '@angular/core';
import {CanSatData, CesiumMapConfig, CanSatDataSet} from '../cansat-tracking.models';
import {Guid} from 'guid-typescript';

@Injectable({
  providedIn: 'root'
})
export class CansatTrackingService {

  mapOptions: CesiumMapConfig = {
    access_token: '',
    model_url: ''
  };
  chromeSerialReaderAppId = '';

  localStorageKeys = {
    map_config: 'cesium_map_config',
    serial_reader_app_id: 'chrome_serial_reader_app_id',
    data_set: 'data_set_'
  };

  constructor() {
    this.updateSiteConfigs();
  }

  public updateSiteConfigs(): void {
    const mapOptionFromLocalDb = this.getMapOptionFromLocalDB();
    mapOptionFromLocalDb ? this.mapOptions = mapOptionFromLocalDb :
      this.mapOptions.model_url = './../../../../assets/3d_models/CesiumBalloon.glb';
    this.chromeSerialReaderAppId = this.getChromeSerialReaderAppIdFromLocalDB();
  }

  private getChromeSerialReaderAppIdFromLocalDB() {
    return JSON.parse(localStorage.getItem(this.localStorageKeys['serial_reader_app_id']));
  }

  private getMapOptionFromLocalDB() {
    return JSON.parse(localStorage.getItem(this.localStorageKeys['map_config']));
  }

  public storeMapOptions(mapConfig: CesiumMapConfig, appId: string): Promise<boolean> {
    return this.storeMapOptionsToLocalDB(mapConfig, appId);
  }

  private storeMapOptionsToLocalDB(mapConfig: CesiumMapConfig, appId: string): Promise<boolean> {
    localStorage.setItem(this.localStorageKeys['map_config'], JSON.stringify(mapConfig));
    localStorage.setItem(this.localStorageKeys['serial_reader_app_id'], JSON.stringify(appId));
    return new Promise((resolve, reject) => {
      resolve(true);
    });
  }

  storeNewData(data: CanSatData[], name): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      if (!data.length) {
        console.error('No data to save');
        reject('No data to save');
      }

      const newGuid = Guid.create();
      const dataSet: CanSatDataSet = {
        data: data,
        name: name,
        _id: newGuid['value'],
        date_created: new Date(),
        date_modified: new Date()
      };
      localStorage.setItem(this.localStorageKeys['data_set'] + newGuid, JSON.stringify(dataSet));

      resolve(true)
    });
  }

  getAllCanSatData() {
    const data: CanSatDataSet[] = [];
    for (let key in localStorage) {
      if (key) {
        if (key.substring(0, this.localStorageKeys['data_set'].length) === this.localStorageKeys['data_set']) {
          data.push(JSON.parse(localStorage.getItem(key)));
        }
      }
    }

    return data;
  }

}
