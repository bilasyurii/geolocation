/// <reference types="@types/googlemaps" />
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { MapsAPILoader } from '@agm/core';

import { PlaceSuggestion } from '../interfaces/placeSuggestion.interface';

type Prediction = google.maps.places.AutocompletePrediction;
type Status = google.maps.places.PlacesServiceStatus;


@Injectable()
export class AutocompleteService {
  suggestions: Observable<PlaceSuggestion[]>;
  private suggestionsSubject = new Subject<PlaceSuggestion[]>();
  private service: google.maps.places.AutocompleteService;

  constructor(private mapsApiLoader: MapsAPILoader) {
    this.suggestions = this.suggestionsSubject.asObservable();
    mapsApiLoader.load().then(() => {
      this.service = new google.maps.places.AutocompleteService();
    });
  }

  private handle(predictions: Prediction[], status: Status) {
    if (status !== google.maps.places.PlacesServiceStatus.OK) {
      return;
    }

    console.log(predictions);

    this.suggestionsSubject.next(predictions .map<PlaceSuggestion>((prediction: Prediction) => {
      return {
        name: prediction.description,
        latitude: 0,
        longitude: 0
      };
    }));
  }

  getSugestions(searchInput: string) {
    this.service.getPlacePredictions({
      input: searchInput,
      types: ['(cities)']
    }, (predictions: Prediction[], status: Status) => {
      this.handle(predictions, status);
    });
  }
}
