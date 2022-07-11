export class RecepcionBean {
    public idRecepcion: string;
    public idOrigen: number;
    public idDestino: number;
    public formaPago: string;
    public remitente: string;
    public destinatario: string;
    public telefonoDestinatario: string;
    public idUsuario: number;
    public idCliente: number;
    public cantidad: number;
    public peso: number;
    public precioUnitario: number;
    public total: number;
    public cambio: number;
    public monto: number;
    public saldo: number;
    public contenido: string;
    public observacion: string;
    public acronimo: string;
    public nroGuia: string;
    public fecha: string;
    public hora: string;
    public estado: number;/**0=anulado 1=recepcionado 2=embarcado 3=desembarcado 4=entregado */
    public observacionAnulado: string;
    public usuarioRegistro: string;
    public fechaRegistro: string;
    public idCaja: number;
}
