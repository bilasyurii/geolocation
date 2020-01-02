import { HttpErrorResponse } from '@angular/common/http';

import { RequestError } from 'src/app/interfaces/requestError.interface';


export enum ResponseStatus {
  Loading,
  Success,
  Error
}

export interface ApiResponse {
  status: ResponseStatus;
  error?: RequestError | HttpErrorResponse;
}
