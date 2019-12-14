import { GeolocationService } from './services/geolocation.service';
import { environment } from './../environments/environment.prod';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AgmCoreModule } from '@agm/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { AppComponent } from './components/app/app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: environment.googleMapsAPIKey
    })
  ],
  providers: [HttpClient, GeolocationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
