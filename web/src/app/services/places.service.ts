import { RequestError } from './../interfaces/requestError.interface';
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

import { GeolocationService } from './geolocation.service';
import { ErrorsService } from './errors.service';
import { Place } from '../interfaces/place.interface';
import { ApiResponse, ResponseStatus } from './../interfaces/apiResponse.interface';
import { PlaceSelection } from '../interfaces/placeSelection.interface';


@Injectable()
export class PlacesService {
  private reloadPossible = true;
  private selectedPlace: Place;
  private placesLoadedSubject = new Subject<ApiResponse>();
  private placeSelectedSubject = new Subject<PlaceSelection>();

  places: Place[] = [];
  placesLoaded: Observable<ApiResponse>;
  placeSelected: Observable<PlaceSelection>;

  constructor(private geolocationService: GeolocationService,
              private errorsService: ErrorsService) {
    this.placesLoaded = this.placesLoadedSubject.asObservable();
    this.placeSelected = this.placeSelectedSubject.asObservable();

    setInterval(() => { this.reloadPossible = true; }, 10000);
  }

  selectPlace(selection: PlaceSelection) {
    this.selectedPlace = selection.place;
    this.placeSelectedSubject.next(selection);
  }

  forceLoadPlaces() {
    this.reloadPossible = false;
    this.placesLoadedSubject.next({ status: ResponseStatus.Loading });

    this.geolocationService.getPlaces().subscribe((response: Place[]) => {
      this.places.splice(0, this.places.length);
      response.forEach(place => place.visible = false);
      this.places.push(...response);

      let toBeSelected: Place;
      if (this.selectedPlace != null) {
        toBeSelected = this.findById(this.selectedPlace.id);
      }
      if (toBeSelected == null && this.places.length > 0) {
        toBeSelected = this.places[0];
      }
      this.selectPlace({ place: toBeSelected, isInitialization: true });

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
    }, error => {
      if (error.name && error.name === 'HttpErrorResponse') {

        let solution: string;
        if (error.error.Information != null && error.error.Information[0] != null) {
          solution = error.error.Information[0].ErrorMessage;
        } else {
          solution = `The server may not be working or there is
                      some another problem with it. Try again later.`;
        }

        const requestError: RequestError = {
          message: error.statusText,
          howToSolve: solution
        };

        if (error.status !== 0) {
          requestError.code = error.status;
        }

        this.errorsService.showErrorPopup(requestError);
      }
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
