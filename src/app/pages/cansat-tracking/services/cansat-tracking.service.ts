import {Injectable} from '@angular/core';
import {CesiumMapConfig} from '../cansat-tracking.models';

@Injectable({
  providedIn: 'root'
})
export class CansatTrackingService {

  mapOptions: CesiumMapConfig = {
    access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' +
      'eyJqdGkiOiIwZTkwMTE0NC0xNDI5LTQ0MzEtOGQzMy01NjA3NTA2NzlkMzIiLCJpZCI6MTgxNDQsInNjb3BlcyI6WyJhc3IiLCJnYyJdLCJpYXQiOjE1NzM0MDA3MDl9.' +
      'gdX9hOVF7dEjO8N2i04QPVthTmfpvdnSk9BvUgU5BCs',
    model_url: '../../../../../assets/3d_models/CesiumBalloon.glb'
  };

  constructor() {
  }
}
