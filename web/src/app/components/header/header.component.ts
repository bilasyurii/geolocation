import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  isHandset: Observable<BreakpointState> = 
    this.breakpointObserver.observe(Breakpoints.HandsetPortrait);

  constructor(private breakpointObserver: BreakpointObserver) { }
}
