import { Component, OnInit } from '@angular/core';

import { PlacesService } from './../../../services/places.service';
import { Place } from 'src/app/interfaces/place.interface';


@Component({
  selector: 'app-places-list',
  templateUrl: './places-list.component.html',
  styleUrls: ['./places-list.component.scss']
})
export class PlacesListComponent implements OnInit {
  places: Place[] = [];

  constructor(private placesService: PlacesService) { }

  ngOnInit() {
    this.places = this.placesService.places;
  }
}
