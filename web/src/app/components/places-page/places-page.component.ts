import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { BreakpointState, Breakpoints, BreakpointObserver } from '@angular/cdk/layout';


@Component({
  selector: 'app-places-page',
  templateUrl: './places-page.component.html',
  styleUrls: ['./places-page.component.scss']
})
export class PlacesPageComponent {
  isHandset: Observable<BreakpointState> =
    this.breakpointObserver.observe(Breakpoints.HandsetPortrait);

  constructor(private breakpointObserver: BreakpointObserver) {}
}
