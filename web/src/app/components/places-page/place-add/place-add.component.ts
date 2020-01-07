/// <reference types="@types/googlemaps" />
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, filter } from 'rxjs/operators';

import { AutocompleteService } from './../../../services/autocomplete.service';
import { PlacesService } from './../../../services/places.service';
import { Place } from 'src/app/interfaces/place.interface';
import { PlaceSuggestion } from './../../../interfaces/placeSuggestion.interface';
import { PlaceLocation } from './../../../interfaces/placeLocation.interface';


@Component({
  selector: 'app-place-add',
  templateUrl: './place-add.component.html',
  styleUrls: ['./place-add.component.scss']
})
export class PlaceAddComponent implements OnInit, OnDestroy {
  places: Place[] = [];
  formWithCoords: FormGroup;
  formWithCity: FormGroup;
  suggestions: Observable<PlaceSuggestion[]>;
  locationLoading: boolean;

  private location: PlaceLocation;
  private locationSubscription: Subscription;

  constructor(
    private placesService: PlacesService,
    private autocompleteService: AutocompleteService
  ) {
    this.InitForms();
    this.setupLocationHandling();
  }

  ngOnInit() {
    this.suggestions = this.formWithCity.get('city').valueChanges.pipe(
      filter((input: string) => input.length > 0),
      debounceTime(100),
      distinctUntilChanged(),
      switchMap((input: string) => this.gatherSuggestions(input))
    );
  }

  ngOnDestroy() {
    this.locationSubscription.unsubscribe();
  }

  private InitForms() {
    this.formWithCoords = new FormGroup({
      name: new FormControl(null, [
        Validators.required,
        Validators.maxLength(32)
      ]),
      latitude: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[-+]?[0-9]*\.?[0-9]+$/),
        Validators.min(-90),
        Validators.max(90)
      ]),
      longitude: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[-+]?[0-9]*\.?[0-9]+$/),
        Validators.min(-180),
        Validators.max(180)
      ]),
      description: new FormControl(null, Validators.maxLength(256))
    });
    this.formWithCity = new FormGroup({
      city: new FormControl(null, Validators.required),
      name: new FormControl(null, Validators.maxLength(32)),
      description: new FormControl(null, Validators.maxLength(256))
    });
  }

  private setupLocationHandling() {
    this.locationSubscription = this.autocompleteService.locationLoaded.subscribe(
      (location: PlaceLocation) => {
        this.locationLoading = false;
        this.location = location;
      }
    );
  }

  private gatherSuggestions(input: string): Observable<PlaceSuggestion[]> {
    return this.autocompleteService.getSugestions(input);
  }

  private loadLocation(suggestion: PlaceSuggestion) {
    this.locationLoading = true;
    this.autocompleteService.getLocation(suggestion.placeId);
  }

  onCityInput(val) {
    this.formWithCity.get('city').setErrors({ noCitySelected: true }, { emitEvent: true });
  }

  selectSuggestion(suggestion: PlaceSuggestion) {
    const control = this.formWithCity.get('city');
    const errors = control.errors;
    if (errors) {
      delete errors.noCitySelected;
      if (!Object.keys(errors).length) {
        control.setErrors(null, { emitEvent: true });
      } else {
        control.setErrors(errors, { emitEvent: true });
      }
    }
    this.loadLocation(suggestion);
  }

  submitWithCoords() {
    this.placesService.addPlace(this.formWithCoords.value);
  }

  submitWithCity() {
    const formData = this.formWithCity.value;

    const formNameData = formData.name as string;
    let placeName: string;
    if (formNameData != null && formNameData.length > 0) {
      placeName = formNameData;
    } else {
      placeName = formData.city.name;
      if (placeName != null) {
        if (placeName.length > 32) {
          placeName = placeName.substring(0, 29) + '...';
        }
      } else {
        this.formWithCity.get('city').setErrors({ noCitySelected: true }, { emitEvent: true });
        return;
      }
    }

    this.placesService.addPlace({
      name: placeName,
      description: formData.description,
      latitude: this.location.latitude,
      longitude: this.location.longitude
    });
  }

  suggestionTransform(suggestion: PlaceSuggestion) {
    return suggestion ? suggestion.name : undefined;
  }

  get name(): AbstractControl {
    return this.formWithCoords.get('name');
  }

  get longitude(): AbstractControl {
    return this.formWithCoords.get('longitude');
  }

  get latitude(): AbstractControl {
    return this.formWithCoords.get('latitude');
  }

  get description(): AbstractControl {
    return this.formWithCoords.get('description');
  }

  get city(): AbstractControl {
    return this.formWithCity.get('city');
  }

  get name2(): AbstractControl {
    return this.formWithCity.get('name');
  }

  get description2(): AbstractControl {
    return this.formWithCity.get('description');
  }

  getErrorMessage(element: AbstractControl): string {
    if (element.hasError('required')) {

      return 'You must enter a value.';

    } else if (element.hasError('noCitySelected')) {

      return 'You must select a city from autocomplete\'s suggestions.';

    } else if (element.hasError('pattern')) {

      return 'You must enter decimal value (only numbers, \'.\' and \'-\').';

    } else if (element.hasError('maxlength')) {

      return 'Value can\'t be longer than ' +
             element.getError('maxlength').requiredLength + ' symbols.';

    } else if (element.hasError('max')) {

      return 'Value can\'t be bigger than ' +
             element.getError('max').max + '.';

    } else if (element.hasError('min')) {

      return 'Value can\'t be smaller than ' +
             element.getError('min').min + '.';

    }
  }
}
