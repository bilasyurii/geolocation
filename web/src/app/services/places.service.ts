import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

import { GeolocationService } from './geolocation.service';
import { Place } from '../interfaces/place.interface';
import { RequestStatusType } from '../models/requestStatusType.enum';


@Injectable()
export class PlacesService {
  places: Place[] = [];
  placesLoaded = new Subject<RequestStatusType | HttpErrorResponse>();

  constructor(private geolocationService: GeolocationService) {}

  addPlace(place: Place) {
    this.places.push(place);
  }

  loadPlaces() {
    this.placesLoaded.next(RequestStatusType.Loading);

    this.geolocationService.getPlaces().subscribe((response: Place[]) => {
      this.places.push(...response);
      this.placesLoaded.next(RequestStatusType.Success);
    }, error => {
      this.placesLoaded.error(error);
    });
  }
}
