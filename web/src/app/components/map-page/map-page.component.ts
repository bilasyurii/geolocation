import { Component, OnInit, ChangeDetectorRef, Inject, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { PlacesService } from 'src/app/services/places.service';
import { Place } from 'src/app/interfaces/place.interface';
import { ResponseStatus, ApiResponse } from 'src/app/interfaces/apiResponse.interface';
import { RequestError } from 'src/app/interfaces/requestError.interface';
import { ErrorsService } from 'src/app/services/errors.service';


@Component({
  selector: 'app-map-page',
  templateUrl: './map-page.component.html',
  styleUrls: ['./map-page.component.scss']
})
export class MapPageComponent implements OnInit, OnDestroy {
  latitude = 49.839683;
  longitude = 24.029717;
  loading = false;
  private placesSubscription: Subscription;
  private placeSelectedSubscription: Subscription;

  places: Place[] = [];

  constructor(private placesService: PlacesService,
              private errorsService: ErrorsService,
              @Inject(ChangeDetectorRef) private changeDetector: ChangeDetectorRef) { }

  ngOnInit() {
    this.places = this.placesService.places;
    this.setupPlaceSelectionHandling();
    this.setupLoadingHandling();
    this.placesService.suggestLoadPlaces();
  }

  private setupPlaceSelectionHandling() {
    this.placeSelectedSubscription = this.placesService.placeSelected.subscribe(
      (place: Place) => {
        if (place != null) {
          this.longitude = place.longitude;
          this.latitude = place.latitude;

          place.visible = true;
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
        this.errorsService.showErrorPopup(response.error as RequestError);
      } else {
        this.loading = true;
      }
    });
  }

  ngOnDestroy() {
    this.placesSubscription.unsubscribe();
  }

  closeWindow(place: Place) {
    place.visible = false;
    this.changeDetector.detectChanges();
  }

  windowToggled(isOpen: boolean, place: Place) {
    place.visible = isOpen;
  }
}
