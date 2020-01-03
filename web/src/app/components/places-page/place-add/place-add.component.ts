import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AutocompleteService } from './../../../services/autocomplete.service';
import { PlacesService } from './../../../services/places.service';
import { Place } from 'src/app/interfaces/place.interface';
import { MapsAPILoader } from '@agm/core';


@Component({
  selector: 'app-place-add',
  templateUrl: './place-add.component.html',
  styleUrls: ['./place-add.component.scss']
})
export class PlaceAddComponent implements OnInit {
  @ViewChild('cityInput', { static: true })
  cityInputRef: ElementRef;
  places: Place[] = [];
  suggestions: Observable<Place[]>;
  formWithCoords: FormGroup;
  formWithCity: FormGroup;

  constructor(private placesService: PlacesService,
              private mapsApiLoader: MapsAPILoader,
              private ngZone: NgZone,
              private autocompleteService: AutocompleteService) {
    this.InitForms();
  }

  ngOnInit() {
    this.mapsApiLoader.load().then(() => {
      const autocomplete = new google.maps.places.Autocomplete(
        this.cityInputRef.nativeElement, {
        types: ['(cities)']
      });

      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          const place: google.maps.places.PlaceResult = autocomplete.getPlace();
          if (place.geometry == null) {
            return;
          }
          console.log(place);
        });
      });
    });

    this.suggestions = this.formWithCity.get('city').valueChanges
      .pipe(
        map(value => this.gatherSuggestions(value))
      );
  }

  private gatherSuggestions(value: string): Place[] {
    this.autocompleteService.getSugestions(value).subscribe((result: Place[]) => {
      console.log(result);
    });

    return [];
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

  transformOption(place?: Place): string | undefined {
    if (place == null) {
      return undefined;
    }
    return place.name;
  }

  submitWithCoords() {
    this.placesService.addPlace(this.formWithCoords.value);
  }

  submitWithCity() {
    console.log(this.formWithCoords.value);
  }
}
