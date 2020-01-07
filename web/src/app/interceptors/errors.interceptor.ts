import { catchError, timeout } from 'rxjs/operators';
import { HttpInterceptor, HttpRequest, HttpEvent, HttpHandler } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';

import { RequestError } from './../interfaces/requestError.interface';
import { ErrorsService } from 'src/app/services/errors.service';


@Injectable()
export class ErrorsInterceptor implements HttpInterceptor {
  constructor(private errorsService: ErrorsService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
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
          const defaultSolution = `The server may not be working or there is
                                   some another problem with it. Try again later.`;

          const requestError: RequestError = {
            message: '',
            howToSolve: ''
          };

          if (error.name === 'HttpErrorResponse') {

            requestError.message = error.statusText;

            if (error.error != null &&
                error.error.Information != null &&
                error.error.Information[0] != null) {
              requestError.howToSolve = error.error.Information[0].ErrorMessage;
            } else {
              requestError.howToSolve =  defaultSolution;
            }

            if (error.status !== 0) {
              requestError.code = error.status;
            }
          } else {
            requestError.message = 'Unknown error';
            requestError.howToSolve =  defaultSolution;
          }

          this.errorsService.showErrorPopup(requestError);
          return throwError(requestError);
        }
      })
    );
  }
}
