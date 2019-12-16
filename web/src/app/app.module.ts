import { environment } from './../environments/environment.prod';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AgmCoreModule } from '@agm/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';
import { GeolocationService } from './services/geolocation.service';

import { AppComponent } from './components/app/app.component';
import { PlacesPageComponent } from './components/places-page/places-page.component';
import { MapPageComponent } from './components/map-page/map-page.component';
import { PlaceComponent } from './components/places-page/place/place.component';
import { HeaderComponent } from './components/header/header.component';
import { PlaceAddComponent } from './components/places-page/place-add/place-add.component';
import { NotFoundComponent } from './components/not-found/not-found.component';


@NgModule({
  declarations: [
    AppComponent,
    PlacesPageComponent,
    MapPageComponent,
    PlaceComponent,
    HeaderComponent,
    PlaceAddComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: environment.googleMapsAPIKey
    })
  ],
  providers: [HttpClient, GeolocationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
