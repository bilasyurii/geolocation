import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePageComponent } from './components/home-page/home-page.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { MapPageComponent } from './components/map-page/map-page.component';
import { PlacesPageComponent } from './components/places-page/places-page.component';


const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'places', component: PlacesPageComponent },
  { path: 'map', component: MapPageComponent },
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
