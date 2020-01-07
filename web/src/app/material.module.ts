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
  MatTooltipModule
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
    MatTooltipModule
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
    MatTooltipModule
  ]
})
export class MaterialModule { }
