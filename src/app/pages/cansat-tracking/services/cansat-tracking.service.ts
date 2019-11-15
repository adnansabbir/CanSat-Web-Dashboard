import {Injectable} from '@angular/core';
import {CesiumMapConfig} from '../cansat-tracking.models';

@Injectable({
  providedIn: 'root'
})
export class CansatTrackingService {

  mapOptions: CesiumMapConfig;

  localStorageKeys = {
    map_config: 'cesium_map_config'
  };

  constructor() {
    this.updateMapOptions();
  }

  public updateMapOptions(): void {
    this.mapOptions = this.getMapOptionFromLocalDB();
  }

  private getMapOptionFromLocalDB() {
    return JSON.parse(localStorage.getItem(this.localStorageKeys['map_config']));
  }

  public storeMapOptions(): Promise<boolean> {
    return this.storeMapOptionsToLocalDB(this.mapOptions);
  }

  private storeMapOptionsToLocalDB(data: CesiumMapConfig): Promise<boolean> {
    localStorage.setItem(this.localStorageKeys['map_config'], JSON.stringify(data));
    return new Promise((resolve, reject) => {
      resolve(true);
    });
  }

}
