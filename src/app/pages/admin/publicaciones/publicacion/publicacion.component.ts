import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { LoadingService } from 'src/app/loading/loading.service';
import { RecepcionBean } from 'src/app/models/recepcion-bean';
import { SweetalertBean } from 'src/app/models/sweetalert-bean';
import { PublicacionService } from 'src/app/services/publicacion.service';
import { SweetalertService } from 'src/app/services/sweetalert.service';
import { SweetAlertConstants } from 'src/app/sweet-alert';

@Component({
  selector: 'app-publicacion',
  templateUrl: './publicacion.component.html',
  styles: [
  ]
})
export class PublicacionComponent implements OnInit {
  public formRecepcion: FormGroup;
  public listaSucursales: any[] = [
    {
      idSucursal: 1,
      nombre: 'SUCURSAL COCHABAMBA'
    },
    {
      idSucursal: 1,
      nombre: 'SUCURSAL LA PAZ'
    },
    {
      idSucursal: 1,
      nombre: 'SUCURSAL SANTA CRUZ'
    },
  ];
  public listaSucursalesAll: any[] = [];
  public formasPago = [
    {
      "titulo": "PAGADO"
    },
    {
      "titulo": "POR PAGAR EN DESTINO"
    }
  ];
  private usuarioBean: any;
  private idRecepcion: string = null;
  public sucursalUsuario: any;
  // private cajaUsuario: CajaBean;
  constructor(
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private loading: LoadingService,
    private modalRef: BsModalRef,
    private recepcionService: PublicacionService,
    private sweetalertService: SweetalertService
  ) {
    this.createFormReception();
  }

  ngOnInit(): void {
    this.subscribersForm();
    if (this.idRecepcion != null) {
      this.getRecepcion();
    }
  }
  private getRecepcion() {
    this.recepcionService.unaRecepcion(this.idRecepcion).subscribe({
      next: data => {
        this.formRecepcion.patchValue(data[0]);
      }
    })
  }
  private createFormReception() {
    this.formRecepcion = this.fb.group({
      idDestino: [null, [Validators.required]],
      formaPago: ['', [Validators.required]],
      remitente: ['', [Validators.required, Validators.pattern(new RegExp('[A-Za-z ]{3,50}'))]],
      destinatario: ['', [Validators.required, Validators.pattern(new RegExp('[A-Za-z ]{3,50}'))]],
      telefonoDestinatario: ['', [Validators.required, Validators.pattern(new RegExp('[0-9]{7,8}')), Validators.minLength(7), Validators.maxLength(8)]],
      cantidad: [0, [Validators.required, Validators.pattern(new RegExp('[0-9]+(\.[0-9][0-9]?)?'))]],
      peso: [0, [Validators.required, Validators.pattern(new RegExp('[0-9]+(\.[0-9][0-9]?)?'))]],
      precioUnitario: [0, [Validators.required, Validators.pattern(new RegExp('[0-9]+(\.[0-9][0-9]?)?'))]],
      total: [0, [Validators.required, Validators.pattern(new RegExp('[0-9]+(\.[0-9][0-9]?)?'))]],
      cambio: [0],
      monto: [0, [Validators.required, Validators.pattern(new RegExp('[0-9]+(\.[0-9][0-9]?)?'))]],
      contenido: ['', [Validators.required]],
      fragil: [true],
      valorNoDeclarado: [true],
      sinDinero: [true],
      observacion: [{ value: '', disabled: true }]
    });
  }

  public get formaPago() {
    return this.formRecepcion.get('formaPago');
  }
  public get remitente() {
    return this.formRecepcion.get('remitente');
  }
  public get destinatario() {
    return this.formRecepcion.get('destinatario');
  }
  public get telefonoDestinatario() {
    return this.formRecepcion.get('telefonoDestinatario');
  }
  public get cantidad() {
    return this.formRecepcion.get('cantidad');
  }
  public get peso() {
    return this.formRecepcion.get('peso');
  }
  public get total() {
    return this.formRecepcion.get('total');
  }
  public get monto() {
    return this.formRecepcion.get('monto');
  }
  public get precioUnitario() {
    return this.formRecepcion.get('precioUnitario');
  }
  public get fragil() {
    return this.formRecepcion.get('fragil');
  }
  public get valorNoDeclarado() {
    return this.formRecepcion.get('valorNoDeclarado');
  }
  public get sinDinero() {
    return this.formRecepcion.get('sinDinero');
  }
  public get observacion() {
    return this.formRecepcion.get('observacion');
  }
  private seleccionarObservacion() {
    let observaciones = [];
    if (this.fragil.value) {
      observaciones.push('FRAGIL');
    }
    if (this.valorNoDeclarado.value) {
      observaciones.push('VALOR NO DECLARADO');
    }
    if (this.sinDinero.value) {
      observaciones.push('SIN DINERO/NI OBJETOS DE VALOR');
    }
    this.observacion.patchValue(observaciones.join(" / "));
  }
  // public openModalSearch() {
  //   let initialState = {
  //     callback: (cliente: ClienteBean) => {
  //       this.formCliente.patchValue(cliente);
  //       this.formCliente.get('nombre').patchValue(cliente.persona.nombres);
  //     }
  //   };
  //   this.modalRef = this.modalService.show(BuscarClienteComponent, Object.assign({ initialState, class: 'modal-lg modal-dialog-centered', ignoreBackdropClick: true }));
  // }
  public saveForm() {
    let recepcion: RecepcionBean = this.formRecepcion.getRawValue();
    recepcion.idOrigen = 20;
    recepcion.idCliente = 1;
    recepcion.idUsuario = 20;
    recepcion.fecha = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    recepcion.hora = this.datePipe.transform(new Date(), 'HH:mm:ss');
    recepcion.acronimo = 'HME';
    recepcion.usuarioRegistro = 'USUARIO PRUEBA';
    recepcion.saldo = recepcion.cantidad;
    recepcion.idCaja = 1;
    // console.log(recepcion);
    // return
    this.loading.setLoading = true;
    if (this.idRecepcion != null) {
      this.recepcionService.editarRecepcion(this.idRecepcion,recepcion).then(data => {
        console.log('hhhh');
      }).catch(er => {
        console.error(er);
      }).finally(() => {
        console.log('finalizado');
      });
    } else {
      this.recepcionService.guardarRecepcion(recepcion).then(data => {
        console.log('hhhh');
      }).catch(er => {
        console.error(er);
      }).finally(() => {
        console.log('finalizado');
      });
    }
    this.modalRef.hide();
    // this.recepcionService.registrarRecepcion(recepcion).subscribe({
    //   next: recepcion => {
    //     // this.printDocument(recepcion);
    //   }, error: e => {
    //     console.log(e);
    //     let error;
    //     if (e.status === 0) {
    //       error = SweetAlertConstants.noConexion;
    //     } else {
    //       error = e.error.message;
    //     }
    //     this.sweetAlertMessage(SweetAlertConstants.SWEET_ALERT_TITLE_OPS, error);
    //     this.loading.setLoading = false;
    //   }, complete: () => {
    //     this.loading.setLoading = false;
    //     this.formRecepcion.reset();
    //     this.formRecepcion.updateValueAndValidity();
    //     this.createFormReception();
    //     this.seleccionarObservacion();
    //     this.subscribersForm();
    //   }
    // });
  }
  public cancelForm() {
    this.modalRef.hide();
  }
  private subscribersForm() {
    this.cantidad.valueChanges.subscribe({
      next: (val: number) => {
        if (this.total.value >= 0 && val >= 0) {
          this.precioUnitario.patchValue((this.total.value / val).toFixed(2), { emitEvent: false });
        }
      }
    });
    this.precioUnitario.valueChanges.subscribe({
      next: (val: number) => {
        if (this.cantidad.value >= 0 && val >= 0) {
          this.total.patchValue((this.cantidad.value * val).toFixed(2), { emitEvent: false });
        }
      }
    });
    this.total.valueChanges.subscribe({
      next: (val: number) => {
        if (this.cantidad.value >= 0 && val >= 0) {
          this.precioUnitario.patchValue((val / this.cantidad.value).toFixed(2), { emitEvent: false });
        }
      }
    });
    this.monto.valueChanges.subscribe({
      next: val => {
        this.formRecepcion.get('cambio').patchValue((val - this.total.value).toFixed(2));
      }
    });
    this.fragil.valueChanges.subscribe({
      next: () => {
        this.seleccionarObservacion();
      }
    });
    this.sinDinero.valueChanges.subscribe({
      next: () => {
        this.seleccionarObservacion();
      }
    });
    this.valorNoDeclarado.valueChanges.subscribe({
      next: () => {
        this.seleccionarObservacion();
      }
    });
  }
  private sweetAlertMessage(title: string, text: string) {
    let sweetalert = new SweetalertBean();
    sweetalert.title = title;
    sweetalert.text = text;
    sweetalert.icon = SweetAlertConstants.SWEET_ALERT_WARNING;
    sweetalert.showConfirmButton = true;
    sweetalert.showCancelButton = false;
    this.sweetalertService.showAlertBasic(sweetalert);
  }
}
