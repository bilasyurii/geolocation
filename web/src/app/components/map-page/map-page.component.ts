import {
  Component,
  OnInit,
  ChangeDetectorRef,
  Inject,
  OnDestroy
} from '@angular/core';
import { Subscription } from 'rxjs';

import { PlacesService } from 'src/app/services/places.service';
import { Place } from 'src/app/interfaces/place.interface';
import { PlaceSelection } from 'src/app/interfaces/placeSelection.interface';
import { ResponseStatus, ApiResponse } from 'src/app/interfaces/apiResponse.interface';


@Component({
  selector: 'app-map-page',
  templateUrl: './map-page.component.html',
  styleUrls: ['./map-page.component.scss']
})
export class MapPageComponent implements OnInit, OnDestroy {
  private placesSubscription: Subscription;
  private placeSelectedSubscription: Subscription;
  private selectedPlace: Place;

  latitude = 49.839683;
  longitude = 24.029717;
  loading = false;
  places: Place[] = [];

  constructor(private placesService: PlacesService,
              @Inject(ChangeDetectorRef) private changeDetector: ChangeDetectorRef) {}

  ngOnInit() {
    this.places = this.placesService.places;
    this.setupPlaceSelectionHandling();
    this.setupLoadingHandling();
    this.placesService.suggestLoadPlaces();
  }

  private setupPlaceSelectionHandling() {
    this.placeSelectedSubscription = this.placesService.placeSelected.subscribe(
      (selection: PlaceSelection) => {
        const place = selection.place;
        if (place != null) {
          this.changeDetector.detectChanges();

          if (selection.isInitialization) {
            this.longitude = place.longitude;
            this.latitude = place.latitude;
          } else {
            place.visible = true;
          }

          if (this.selectedPlace != null && this.selectedPlace !== place) {
            this.selectedPlace.visible = false;
          }
          this.selectedPlace = place;
        }
      }
    );
  }

  private setupLoadingHandling() {
    this.placesSubscription = this.placesService.placesLoaded.subscribe((response: ApiResponse) => {
      if (response.status === ResponseStatus.Success) {
        this.loading = false;
      } else if (response.status === ResponseStatus.Error) {
        this.loading = false;
      } else {
        this.loading = true;
      }
    });
  }

  ngOnDestroy() {
    this.placesSubscription.unsubscribe();
    this.placeSelectedSubscription.unsubscribe();
  }

  closeWindow(place: Place) {
    place.visible = false;
    this.changeDetector.detectChanges();
  }

  windowToggled(isOpen: boolean, toggledPlace: Place) {
    if (toggledPlace.visible !== isOpen) {
      if (isOpen) {
        this.placesService.selectPlace({ place: toggledPlace, isInitialization: false});
      } else {
        toggledPlace.visible = false;
      }
    }
  }
}
