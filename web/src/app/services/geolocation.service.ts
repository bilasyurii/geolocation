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
        timeout(10000),
        catchError(error => {
          if (error.name === 'TimeoutError') {
            return throwError({
              message: 'Request timed out',
              howToSolve: `
                  Check if you have a proper internet connection.
                  If you do, then there is a problem on server, so try again later.`
            });
          } else {
            const solution = `The server may not be working or there is
                              some another problem with it. Try again later.`;
            if (error.name === 'HttpErrorResponse' && error.status !== 0) {
              return throwError({
                message: error.statusText,
                howToSolve: solution,
                code: error.status
              });
            } else {
              return throwError({
                message: 'Unknown error',
                howToSolve: solution
              });
            }
          }
        })
      );
  }
}
