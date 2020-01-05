import { Component, OnInit } from '@angular/core';

import { PlacesService } from 'src/app/services/places.service';
import { Place } from 'src/app/interfaces/place.interface';
import { PlaceLocation } from './../../interfaces/placeLocation.interface';


@Component({
  selector: 'app-map-page',
  templateUrl: './map-page.component.html',
  styleUrls: ['./map-page.component.scss']
})
export class MapPageComponent implements OnInit {
  latitude = 49.839683;
  longitude = 24.029717;

  places: Place[] = [];

  constructor(private placesService: PlacesService) { }

  ngOnInit() {
    this.places = this.placesService.places;
  }
}
