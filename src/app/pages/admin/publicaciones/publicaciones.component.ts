import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { forkJoin, Observable, Subject } from 'rxjs';
import { LoadingService } from 'src/app/loading/loading.service';
import { RecepcionBean } from 'src/app/models/recepcion-bean';
import { SweetalertBean } from 'src/app/models/sweetalert-bean';
import { PublicacionService } from 'src/app/services/publicacion.service';
import { SweetalertService } from 'src/app/services/sweetalert.service';
import { SweetAlertConstants } from 'src/app/sweet-alert';
import { PublicacionComponent } from './publicacion/publicacion.component';

@Component({
  selector: 'app-publicaciones',
  templateUrl: './publicaciones.component.html',
  styles: [
  ]
})
export class PublicacionesComponent implements OnInit {
  private modalRef: BsModalRef;
  public listaRecepciones: RecepcionBean[] = [];
  constructor(
    private modalService: BsModalService,
    private publicacionService: PublicacionService
  ) { }
  ngOnInit(): void {
    this.publicacionService.recepcionLista().subscribe({
      next: data => {
        console.log(data);
        this.listaRecepciones = [];
        this.listaRecepciones = [...data];
      }, error: e => {
        console.error(e);
      }, complete: () => {

      }
    });
  }
  public createEdit(idRecepcion?: string) {
    let initialState = {
      idRecepcion
    };
    this.modalRef = this.modalService.show(PublicacionComponent, Object.assign({ initialState, class: 'modal-xl modal-dialog-centered', ignoreBackdropClick: true }));
  }
  public deleteItem(idRecepcion: string) {
    this.publicacionService.eliminarRecepcion(idRecepcion).then(data => {
      console.log(data);
    }).catch(er => {
      console.error(er);
    }).finally(() => {
      console.log('finalizado');
    });
  }
}
