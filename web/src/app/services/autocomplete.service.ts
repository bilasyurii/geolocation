import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Place } from '../interfaces/place.interface';


@Injectable()
export class AutocompleteService {
  constructor(private httpClient: HttpClient) {}

  getSugestions(input: string): Observable<Place[]> {
    return this.httpClient.get(environment.googlePlacesAPI +
                        'input=' + input +
                        '&types=(cities)&key=' +
                        environment.googleAPIKey)
      .pipe(map(value => {
        console.log(value);
        return [];
      }));
  }
}
