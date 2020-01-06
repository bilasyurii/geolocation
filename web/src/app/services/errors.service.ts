import { MatDialog } from '@angular/material';
import { Injectable } from '@angular/core';

import { WindowScrollingService } from './windowScrolling.service';
import { RequestError } from '../interfaces/requestError.interface';
import { ErrorPopupComponent } from '../components/error-popup/error-popup.component';


@Injectable()
export class ErrorsService {
  constructor(private dialog: MatDialog,
              private windowScrolling: WindowScrollingService) {}

  showErrorPopup(error: RequestError) {
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
}
