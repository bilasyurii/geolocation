import { Component, Input } from '@angular/core';

import { PlacesService } from './../../../../services/places.service';
import { Place } from 'src/app/interfaces/place.interface';


@Component({
  selector: 'app-place',
  templateUrl: './place.component.html',
  styleUrls: ['./place.component.scss']
})
export class PlaceComponent {
  @Input() place: Place;

  constructor(private PlacesService: PlacesService) { }
}
