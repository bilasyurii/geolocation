import { Place } from '../interfaces/place.interface';

export class PlacesService {
  places: Place[] = [
    {
      Id: 1,
      Name: 'Lviv',
      Description: 'Best place on Earth.',
      Latitude: 49.500001,
      Longitude: 24.000001
    },
    {
      Id: 2,
      Name: 'Rome',
      Description: 'Wanna go there sometimes!',
      Latitude: 48.000001,
      Longitude: 10.000001
    }
  ];

  addPlace(place: Place) {
    this.places.push(place);
  }

  loadPlaces() {
    // TODO
  }
}
