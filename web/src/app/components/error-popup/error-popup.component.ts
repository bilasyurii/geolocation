import { RequestError } from './../../interfaces/requestError.interface';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-error-popup',
  templateUrl: './error-popup.component.html',
  styleUrls: ['./error-popup.component.scss']
})
export class ErrorPopupComponent {
  constructor(public dialogRef: MatDialogRef<ErrorPopupComponent>,
              @Inject(MAT_DIALOG_DATA) public data: RequestError) {}
}
