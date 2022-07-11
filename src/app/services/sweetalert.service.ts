import { Injectable } from '@angular/core';
import Swal, { SweetAlertResult } from 'sweetalert2';
import { SweetalertBean } from '../models/sweetalert-bean';

@Injectable({
  providedIn: 'root'
})
export class SweetalertService {

  constructor() { }
  public showAlertBasic(sweetBean: SweetalertBean): void {
    Swal.fire(sweetBean);
  }

  public showAlertConfirm(sweetBean: SweetalertBean): Promise<SweetAlertResult> {
    return Swal.fire(sweetBean);
  }
}
