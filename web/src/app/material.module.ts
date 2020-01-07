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
  MatDialogModule,
  MatExpansionModule,
  MatAutocompleteModule,
  MatTooltipModule,
  MatSnackBarModule
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
    MatDialogModule,
    MatExpansionModule,
    MatAutocompleteModule,
    MatTooltipModule,
    MatSnackBarModule
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
    MatDialogModule,
    MatExpansionModule,
    MatAutocompleteModule,
    MatTooltipModule,
    MatSnackBarModule
  ]
})
export class MaterialModule { }
