import { RequestError } from './../../interfaces/requestError.interface';
import { Component, Inject, AfterViewInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-error-popup',
  templateUrl: './error-popup.component.html',
  styleUrls: ['./error-popup.component.scss']
})
export class ErrorPopupComponent implements AfterViewInit {
  disableAnimations = true;

  constructor(public dialogRef: MatDialogRef<ErrorPopupComponent>,
              @Inject(MAT_DIALOG_DATA) public data: RequestError) {}

  ngAfterViewInit() {
    setTimeout(() => this.disableAnimations = false);
  }
}
