import {Injectable} from '@angular/core';
import {CesiumMapConfig} from '../cansat-tracking.models';

@Injectable({
  providedIn: 'root'
})
export class CansatTrackingService {

  mapOptions: CesiumMapConfig;
  chromeSerialReaderAppId = '';

  localStorageKeys = {
    map_config: 'cesium_map_config',
    serial_reader_app_id: 'chrome_serial_reader_app_id',
  };

  constructor() {
    this.updateSiteConfigs();
  }

  public updateSiteConfigs(): void {
    this.mapOptions = this.getMapOptionFromLocalDB();
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

}
