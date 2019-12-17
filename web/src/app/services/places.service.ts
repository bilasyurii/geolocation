import { Place } from '../interfaces/place.interface';

export class PlacesService {
  places: Place[] = [
    {
      Id: 1,
      Name: 'Hello',
      Description: 'World',
      Latitude: 49.5,
      Longitude: 24
    }
  ];

  addPlace(place: Place) {
    this.places.push(place);
  }

  loadPlaces() {
    // TODO
  }
}
