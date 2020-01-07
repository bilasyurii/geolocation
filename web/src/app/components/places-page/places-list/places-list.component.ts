import { Component, OnInit, OnDestroy } from '@angular/core';
import { BreakpointObserver, BreakpointState, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';

import { ResponseStatus, ApiResponse } from './../../../interfaces/apiResponse.interface';
import { PlacesService } from './../../../services/places.service';
import { Place } from 'src/app/interfaces/place.interface';


@Component({
  selector: 'app-places-list',
  templateUrl: './places-list.component.html',
  styleUrls: ['./places-list.component.scss']
})
export class PlacesListComponent implements OnInit, OnDestroy {
  places: Place[] = [];
  isHandset: Observable<BreakpointState> =
    this.breakpointObserver.observe(Breakpoints.HandsetPortrait);
  loading = false;
  private placesSubscription: Subscription;

  constructor(private placesService: PlacesService,
              private breakpointObserver: BreakpointObserver) { }

  ngOnInit() {
    this.places = this.placesService.places;
    this.setupLoadingHandling();
    this.placesService.suggestLoadPlaces();
  }

  ngOnDestroy() {
    this.placesSubscription.unsubscribe();
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
}
