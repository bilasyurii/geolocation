import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { PlacesService } from 'src/app/services/places.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [PlacesService]
})
export class AppComponent implements OnInit {
  private appName = 'Geolocation';

  constructor(private router: Router, private titleService: Title) { }

  ngOnInit() {
    this.router.events
      .subscribe((event) => {
          if (event instanceof NavigationEnd) {
            const url = (event as NavigationEnd).urlAfterRedirects;
            let title = this.appName;
            if (url === '/places') {
              title = 'Places | ' + title;
            } else if (url === '/map') {
              title = 'Map | ' + title;
            } else if (url === '/404') {
              title = 'Page not found | ' + title;
            }
            this.titleService.setTitle(title);
          }
        }
      );
  }
}
