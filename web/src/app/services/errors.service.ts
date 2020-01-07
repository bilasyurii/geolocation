import { MatDialog, MatSnackBar } from '@angular/material';
import { Injectable } from '@angular/core';

import { WindowScrollingService } from './windowScrolling.service';
import { RequestError } from '../interfaces/requestError.interface';
import { ErrorPopupComponent } from '../components/error-popup/error-popup.component';


@Injectable()
export class ErrorsService {
  constructor(private dialog: MatDialog,
              private snackBar: MatSnackBar,
              private windowScrolling: WindowScrollingService) {}

  showErrorPopup(error: RequestError) {
    let message = 'Error: ' + error.message;
    if (message.length > 32) {
      message = error.message;
    }
    if (message.length > 32) {
      message = message.substring(0, 29) + '...';
    }

    const snackBarRef = this.snackBar.open(message, 'View details', { duration: 5000 });

    snackBarRef.onAction().subscribe(() => {
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
    });
  }
}
