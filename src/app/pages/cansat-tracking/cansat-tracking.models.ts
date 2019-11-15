export class CansatTrackingCards {
  title: string;
  subtitle: string;
  icon_class_name: string;
  data_key: string;
}

export class CanSatData {
  altitude: number;
  battery_voltage: number;
  gps_location: [number, number];
  gps_time: number;
  mission_time: number;
  pressure: number;
  temp: number;
}

export class CesiumMapConfig {
  access_token: string;
  model_url: string;
}
