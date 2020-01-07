import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

import { Place } from 'src/app/interfaces/place.interface';


@Injectable()
export class GeolocationService {
  constructor(private httpClient: HttpClient) {}
  private url = environment.geolocationAPI + 'place';

  getPlaces() {
    return this.httpClient.get(this.url);
  }

  addPlace(place: Place) {
    const dataToSend = {
      name: place.name,
      description: place.description,
      latitude: place.latitude,
      longitude: place.longitude
    };
    return this.httpClient.post(this.url, dataToSend);
  }

  deletePlace(id: number) {
    return this.httpClient.delete(this.url + '/' + id);
  }
}
