import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { timeout, catchError } from 'rxjs/operators';
import { of, throwError } from 'rxjs';


@Injectable()
export class GeolocationService {
  constructor(private httpClient: HttpClient) {}

  getPlaces() {
    return this.httpClient.get(environment.geolocationAPI + 'place')
      .pipe(
        timeout(2000),
        catchError(error => {
          return throwError({
            message: 'Request timed out',
            howToSolve: `
                Check if you have a proper internet connection.
                If you do, then there is a problem on server, so try again later.
              `
          });
        })
      );
  }
}
