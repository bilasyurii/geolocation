/// <reference types="@types/googlemaps" />
import { Injectable } from '@angular/core';
import { NgZone } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { MapsAPILoader } from '@agm/core';

import { PlaceSuggestion } from '../interfaces/placeSuggestion.interface';
import { PlaceLocation } from './../interfaces/placeLocation.interface';


type Prediction = google.maps.places.AutocompletePrediction;
type Status = google.maps.places.PlacesServiceStatus;
type PlaceResult = google.maps.places.PlaceResult;

@Injectable()
export class AutocompleteService {
  locationLoaded: Observable<PlaceLocation>;

  private suggestionsSubject = new Subject<PlaceSuggestion[]>();
  private locationSubject = new Subject<PlaceLocation>();
  private completeService: google.maps.places.AutocompleteService;
  private infoService: google.maps.places.PlacesService;

  constructor(private mapsApiLoader: MapsAPILoader, private zone: NgZone) {
    this.locationLoaded = this.locationSubject.asObservable();

    mapsApiLoader.load().then(() => {
      this.completeService = new google.maps.places.AutocompleteService();
      this.infoService = new google.maps.places.PlacesService(
        new google.maps.Map(document.createElement('div')));
    });
  }

  private handlePredictions(predictions: Prediction[], status: Status) {
    if (status !== google.maps.places.PlacesServiceStatus.OK) {
      return;
    }

    this.suggestionsSubject.next(predictions.map<PlaceSuggestion>((prediction: Prediction) => {
      return {
        name: prediction.description,
        placeId: prediction.place_id
      };
    }));
  }

  private handleDetails(result: PlaceResult, status: Status) {
    if (status !== google.maps.places.PlacesServiceStatus.OK) {
      return;
    }

    const location = result.geometry.location;

    this.locationSubject.next({
      latitude: location.lat(),
      longitude: location.lng()
    });
  }

  getSugestions(searchInput: string): Observable<PlaceSuggestion[]> {
    const request = {
      input: searchInput,
      types: ['(cities)']
    };
    this.completeService.getPlacePredictions(request,
        (predictions: Prediction[], status: Status) => {
      this.zone.run(() => {
        this.handlePredictions(predictions, status);
      });
    });
    return this.suggestionsSubject.asObservable();
  }

  getLocation(id: string) {
    const request = {
      placeId: id,
      fields: ['geometry']
    };
    this.infoService.getDetails(request, (result: PlaceResult, status: Status) => {
      this.zone.run(() => {
        this.handleDetails(result, status);
      });
    });
  }
}
