export class CansatTrackingCards {
  title: string;
  subtitle: string;
  icon_class_name: string;
  data_key: string;
  unit: string;
}

export interface GpsDataModel {
  alt: number;
  lat: number;
  long: number;
  sat_count: number;
  speed: number;
  time: number;
}

export interface GyroDataModel {
  pitch: number;
  roll: number;
  yaw: number;
}

export interface CanSatData {
  altitude: number;
  battery_voltage: number;
  gps: GpsDataModel;
  gyro: GyroDataModel;
  mission_time: number;
  pressure: number;
  temp: number;
}

export interface CanSatDataSet {
  data: CanSatData[];
  name: string;
  _id: string;
  date_created: Date;
  date_modified: Date;
}

export class CesiumMapConfig {
  access_token: string;
  model_url: string;
}

export interface AlertMessage {
  message: string;
  class: string;
}
