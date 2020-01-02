import { Component } from '@angular/core';

import { PlacesService } from 'src/app/services/places.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [PlacesService]
})
export class AppComponent { }
