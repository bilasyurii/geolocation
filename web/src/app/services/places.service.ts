import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { GeolocationService } from './geolocation.service';
import { Place } from '../interfaces/place.interface';
import { ApiResponse, ResponseStatus } from './../interfaces/apiResponse.interface';


@Injectable()
export class PlacesService {
  places: Place[] = [];
  placesLoaded = new Subject<ApiResponse>();

  constructor(private geolocationService: GeolocationService) {}

  addPlace(place: Place) {
    this.places.push(place);
  }

  loadPlaces() {
    this.placesLoaded.next({ status: ResponseStatus.Loading });

    this.geolocationService.getPlaces().subscribe((response: Place[]) => {
      this.places.push(...response);
      this.placesLoaded.next({ status: ResponseStatus.Success });
    }, err => {
      this.placesLoaded.next({ status: ResponseStatus.Error, error: err});
    });
  }
}
