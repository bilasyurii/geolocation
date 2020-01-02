import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, BreakpointState, Breakpoints } from '@angular/cdk/layout';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material';

import { PlacesService } from './../../../services/places.service';
import { Place } from 'src/app/interfaces/place.interface';
import { RequestStatusType } from 'src/app/models/requestStatusType.enum';
import { RequestError } from 'src/app/interfaces/requestError.interface';
import { ErrorPopupComponent } from '../../error-popup/error-popup.component';
import { WindowScrolling } from 'src/app/services/windowScrolling.service';


@Component({
  selector: 'app-places-list',
  templateUrl: './places-list.component.html',
  styleUrls: ['./places-list.component.scss']
})
export class PlacesListComponent implements OnInit {
  places: Place[] = [];
  isHandset: Observable<BreakpointState> =
    this.breakpointObserver.observe(Breakpoints.HandsetPortrait);

  constructor(private placesService: PlacesService,
              private breakpointObserver: BreakpointObserver,
              private dialog: MatDialog,
              private windowScrolling: WindowScrolling) { }

  ngOnInit() {
    this.setupLoadingHandling();
    this.placesService.loadPlaces();
  }

  private setupLoadingHandling() {
    this.placesService.placesLoaded.subscribe((status: RequestStatusType) => {
      if (status === RequestStatusType.Success) {
        this.places = this.placesService.places;
      }
    }, (error: HttpErrorResponse | RequestError) => {
      let err: RequestError;
      if (this.isHttpErrorResponse(error)) {
        const httpErrorResponse = error as HttpErrorResponse;
        err = {
          message: httpErrorResponse.statusText,
          howToSolve: 'Please, try again later.'
        };
        const code = httpErrorResponse.status;
        if (code != null && code !== 0) {
          err.code = code;
        }
      } else {
        err = error as RequestError;
      }
      this.showErrorPopup(err);
    });
  }

  private showErrorPopup(error: RequestError) {
    const popup = this.dialog.open(ErrorPopupComponent, {
      width: '250px',
      data: error
    });
  }

  private isHttpErrorResponse(value: HttpErrorResponse | RequestError): boolean {
    return 'name' in value;
  }
}
