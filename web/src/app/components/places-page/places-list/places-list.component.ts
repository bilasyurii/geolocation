import { Component, OnInit, OnDestroy } from '@angular/core';
import { BreakpointObserver, BreakpointState, Breakpoints } from '@angular/cdk/layout';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { MatDialog } from '@angular/material';

import { ResponseStatus, ApiResponse } from './../../../interfaces/apiResponse.interface';
import { PlacesService } from './../../../services/places.service';
import { Place } from 'src/app/interfaces/place.interface';
import { RequestError } from 'src/app/interfaces/requestError.interface';
import { ErrorPopupComponent } from '../../error-popup/error-popup.component';
import { WindowScrolling } from 'src/app/services/windowScrolling.service';


@Component({
  selector: 'app-places-list',
  templateUrl: './places-list.component.html',
  styleUrls: ['./places-list.component.scss']
})
export class PlacesListComponent implements OnInit, OnDestroy {
  places: Place[] = [];
  isHandset: Observable<BreakpointState> =
    this.breakpointObserver.observe(Breakpoints.HandsetPortrait);
  loading = false;
  private subscription: Subscription;

  constructor(private placesService: PlacesService,
              private breakpointObserver: BreakpointObserver,
              private dialog: MatDialog,
              private windowScrolling: WindowScrolling/*TODO*/) { }

  ngOnInit() {
    this.setupLoadingHandling();
    this.startLoading();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private startLoading() {
    this.loading = true;
    this.placesService.loadPlaces();
  }

  private setupLoadingHandling() {
    this.subscription = this.placesService.placesLoaded.subscribe((response: ApiResponse) => {
      if (response.status === ResponseStatus.Success) {
        this.places = this.placesService.places;
        this.loading = false;
      } else if (response.status === ResponseStatus.Error) {
        this.loading = false;

        let err: RequestError;
        if (this.isHttpErrorResponse(response.error)) {
          const httpErrorResponse = response.error as HttpErrorResponse;
          err = {
            message: httpErrorResponse.statusText,
            howToSolve: 'Please, try again later.'
          };
          const code = httpErrorResponse.status;
          if (code != null && code !== 0) {
            err.code = code;
          }
        } else {
          err = response.error as RequestError;
        }
        this.showErrorPopup(err);
      }
    });
  }

  private showErrorPopup(error: RequestError) {
    this.windowScrolling.disable();

    const popup = this.dialog.open(ErrorPopupComponent, {
      width: '50vw',
      minWidth: '300px',
      maxWidth: '500px',
      data: error
    });

    popup.afterClosed().subscribe(result => {
      this.windowScrolling.enable();
    });
  }

  private isHttpErrorResponse(value: HttpErrorResponse | RequestError): boolean {
    return 'name' in value;
  }
}
