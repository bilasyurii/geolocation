import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class GeolocationService {
  constructor(private httpClient: HttpClient) {}

  getPlaces() {
    return this.httpClient.get(environment.geolocationAPI + 'place');
  }
}
