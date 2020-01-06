import { Component, Input, ChangeDetectorRef, Inject } from '@angular/core';
import { BreakpointState, Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { PlacesService } from './../../../../services/places.service';
import { Place } from 'src/app/interfaces/place.interface';


@Component({
  selector: 'app-place',
  templateUrl: './place.component.html',
  styleUrls: ['./place.component.scss']
})
export class PlaceComponent {
  @Input() place: Place;
  isHandset: Observable<BreakpointState> =
    this.breakpointObserver.observe([Breakpoints.HandsetPortrait,
                                    '(max-width: 720px)']);

  constructor(private placesService: PlacesService,
              private breakpointObserver: BreakpointObserver,
              private router: Router) {}

  delete() {
    this.placesService.deletePlace(this.place.id);
  }

  showOnMap() {
    this.placesService.selectPlace({ place: this.place, isInitialization: false });
    this.router.navigate(['/map']);
  }
}
