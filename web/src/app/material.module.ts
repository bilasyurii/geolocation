import { NgModule } from '@angular/core';
import {
  MatSidenavModule,
  MatToolbarModule,
  MatIconModule,
  MatListModule,
  MatButtonModule,
  MatTabsModule,
  MatInputModule,
  MatCardModule,
  MatProgressSpinnerModule,
  MatDialogModule
} from '@angular/material';


@NgModule({
  imports: [
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatTabsModule,
    MatInputModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatDialogModule
  ],
  exports: [
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatTabsModule,
    MatInputModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatDialogModule
  ]
})
export class MaterialModule { }
