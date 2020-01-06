import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

import { GeolocationService } from './geolocation.service';
import { Place } from '../interfaces/place.interface';
import { ApiResponse, ResponseStatus } from './../interfaces/apiResponse.interface';


@Injectable()
export class PlacesService {
  private reloadPossible = true;
  private selectedPlace: Place;
  private placesLoadedSubject = new Subject<ApiResponse>();
  private placeSelectedSubject = new Subject<Place>();

  places: Place[] = [];
  placesLoaded: Observable<ApiResponse>;
  placeSelected: Observable<Place>;

  constructor(private geolocationService: GeolocationService) {
    this.placesLoaded = this.placesLoadedSubject.asObservable();
    this.placeSelected = this.placeSelectedSubject.asObservable();

    setInterval(() => { this.reloadPossible = true; }, 10000);
  }

  selectPlace(place: Place) {
    this.selectedPlace = place;
    this.placeSelectedSubject.next(place);
  }

  forceLoadPlaces() {
    this.reloadPossible = false;
    this.placesLoadedSubject.next({ status: ResponseStatus.Loading });

    this.geolocationService.getPlaces().subscribe((response: Place[]) => {
      this.places.splice(0, this.places.length);
      response.forEach(place => place.visible = false);
      this.places.push(...response);

      if (this.selectedPlace != null) {
        this.selectPlace(this.findById(this.selectedPlace.id));
      }
      if (this.places.length > 0 && this.selectedPlace == null) {
        this.selectPlace(this.places[0]);
      }

      this.placesLoadedSubject.next({ status: ResponseStatus.Success });
    }, err => {
      this.reloadPossible = true;
      this.placesLoadedSubject.next({ status: ResponseStatus.Error, error: err});
    });
  }

  suggestLoadPlaces() {
    if (this.reloadPossible) {
      this.forceLoadPlaces();
    }
  }

  addPlace(place: Place) {
    this.geolocationService.addPlace(place).subscribe((response: Place) => {
      response.visible = false;
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

  findById(id: number): Place | undefined {
    return this.places.find((place: Place) => place.id === id);
  }
}
