import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-place-add',
  templateUrl: './place-add.component.html',
  styleUrls: ['./place-add.component.scss']
})
export class PlaceAddComponent {
  formWithCoords: FormGroup;
  formWithCity: FormGroup;

  constructor() {
    this.formWithCoords = new FormGroup({
      name: new FormControl(null, Validators.required),
      latitude: new FormControl(null, Validators.required),
      longitude: new FormControl(null, Validators.required),
      description: new FormControl(null),
    });
    this.formWithCity = new FormGroup({
      city: new FormControl(null, Validators.required),
      description: new FormControl(null),
    });
  }

  submitWithCoords() {
    console.log(this.formWithCoords);
  }

  submitWithCity() {
    console.log(this.formWithCoords);
  }
}
