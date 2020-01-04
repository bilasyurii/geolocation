/// <reference types="@types/googlemaps" />
import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { AutocompleteService } from './../../../services/autocomplete.service';
import { PlacesService } from './../../../services/places.service';
import { Place } from 'src/app/interfaces/place.interface';
import { PlaceSuggestion } from './../../../interfaces/placeSuggestion.interface';


@Component({
  selector: 'app-place-add',
  templateUrl: './place-add.component.html',
  styleUrls: ['./place-add.component.scss']
})
export class PlaceAddComponent implements OnInit {
  places: Place[] = [];
  formWithCoords: FormGroup;
  formWithCity: FormGroup;
  suggestions: Observable<PlaceSuggestion[]>;

  constructor(private placesService: PlacesService,
              private autocompleteService: AutocompleteService) {
    this.InitForms();
  }

  ngOnInit() {
    this.suggestions = this.autocompleteService.suggestions;
    this.formWithCity.get('city').valueChanges.subscribe(
      (value: string) => this.autocompleteService.getSugestions(value));
      // .pipe(
      //   map(value => this.gatherSuggestions(value))
      // );
  }

  private InitForms() {
    this.formWithCoords = new FormGroup({
      name: new FormControl(null, Validators.required),
      latitude: new FormControl(null, Validators.required),
      longitude: new FormControl(null, Validators.required),
      description: new FormControl(null),
    });
    this.formWithCity = new FormGroup({
      city: new FormControl(null, Validators.required),
      description: new FormControl(null),
    });
  }

  submitWithCoords() {
    this.placesService.addPlace(this.formWithCoords.value);
  }

  submitWithCity() {
    console.log(this.formWithCoords.value);
  }
}
