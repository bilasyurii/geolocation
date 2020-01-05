import { environment } from './../environments/environment.prod';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { AgmSnazzyInfoWindowModule } from '@agm/snazzy-info-window';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material.module';
import { GeolocationService } from './services/geolocation.service';
import { AutocompleteService } from './services/autocomplete.service';
import { WindowScrollingService } from './services/windowScrolling.service';
import { AppComponent } from './components/app/app.component';
import { PlacesPageComponent } from './components/places-page/places-page.component';
import { MapPageComponent } from './components/map-page/map-page.component';
import { HeaderComponent } from './components/header/header.component';
import { PlaceAddComponent } from './components/places-page/place-add/place-add.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { PlacesListComponent } from './components/places-page/places-list/places-list.component';
import { PlaceComponent } from './components/places-page/places-list/place/place.component';
import { LoadingComponent } from './components/loading/loading.component';
import { ErrorPopupComponent } from './components/error-popup/error-popup.component';


@NgModule({
  declarations: [
    AppComponent,
    PlacesPageComponent,
    MapPageComponent,
    HeaderComponent,
    PlaceAddComponent,
    NotFoundComponent,
    PlacesListComponent,
    PlaceComponent,
    LoadingComponent,
    ErrorPopupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: environment.googleAPIKey,
      libraries: ['places']
    }),
    AgmSnazzyInfoWindowModule
  ],
  providers: [GeolocationService, HttpClient, WindowScrollingService, AutocompleteService],
  bootstrap: [AppComponent],
  entryComponents: [ErrorPopupComponent]
})
export class AppModule { }
