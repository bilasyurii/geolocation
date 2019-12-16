import { Component } from '@angular/core';

import { GeolocationService } from 'src/app/services/geolocation.service';


@Component({
  selector: 'app-map-page',
  templateUrl: './map-page.component.html',
  styleUrls: ['./map-page.component.scss']
})
export class MapPageComponent {
  latitude = 51.678418;
  longitude = 7.809007;

  constructor(private geolocationService: GeolocationService) { }

  onClick() {
    this.geolocationService.getPlaces().subscribe((response: any) => {
      console.log('!!! Result:');
      console.log(response);
    }, error => {
      console.log('!!! Error:');
      console.log(error);
    });
  }
}
