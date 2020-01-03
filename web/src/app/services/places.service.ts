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

  loadPlaces() {
    this.placesLoaded.next({ status: ResponseStatus.Loading });

    this.geolocationService.getPlaces().subscribe((response: Place[]) => {
      this.places.splice(0, this.places.length);
      this.places.push(...response);
      this.placesLoaded.next({ status: ResponseStatus.Success });
    }, err => {
      this.placesLoaded.next({ status: ResponseStatus.Error, error: err});
    });
  }

  addPlace(place: Place) {
    this.geolocationService.addPlace(place).subscribe((response: Place) => {
      this.places.push(response);
    });
  }

  deletePlace(id: number) {
    this.geolocationService.deletePlace(id).subscribe((response: any) => {
      for (let i = 0; i < this.places.length; ++i) {
        if (this.places[i].id === id) {
          this.places.splice(i, 1);
        }
      }
    });
  }
}
