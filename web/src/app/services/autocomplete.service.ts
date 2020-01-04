/// <reference types="@types/googlemaps" />
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { MapsAPILoader } from '@agm/core';

import { PlaceSuggestion } from '../interfaces/placeSuggestion.interface';

type Prediction = google.maps.places.AutocompletePrediction;
type Status = google.maps.places.PlacesServiceStatus;


@Injectable()
export class AutocompleteService {
  private service: google.maps.places.AutocompleteService;
  private receivedSuggestions = new Subject<PlaceSuggestion[]>();

  constructor(private mapsApiLoader: MapsAPILoader) {
    mapsApiLoader.load().then(() => {
      this.service = new google.maps.places.AutocompleteService();
    });
  }

  private handle(predictions: Prediction[], status: Status) {
    if (status !== google.maps.places.PlacesServiceStatus.OK) {
      return;
    }

    this.receivedSuggestions.next(predictions .map<PlaceSuggestion>((prediction: Prediction) => {
      return {
        name: prediction.description,
        latitude: 0,
        longitude: 0
      };
    }));
  }

  getSugestions(searchInput: string): Observable<PlaceSuggestion[]> {
    this.service.getPlacePredictions({
      input: searchInput,
      types: ['(cities)']
    }, (predictions: Prediction[], status: Status) => {
      this.handle(predictions, status);
    });
    return this.receivedSuggestions.asObservable();
  }
}
