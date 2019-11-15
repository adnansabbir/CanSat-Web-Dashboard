export class CansatTrackingCards {
  title: string;
  subtitle: string;
  icon_class_name: string;
  data_key: string;
}

export interface CanSatData {
  altitude: number;
  battery_voltage: number;
  gps_location: [number, number];
  gps_time: number;
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
