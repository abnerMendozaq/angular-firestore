import { SweetAlertIcon, SweetAlertOptions } from "sweetalert2";
import { SweetAlertConstants } from "../sweet-alert";

let constants = SweetAlertConstants;
export class SweetalertBean implements SweetAlertOptions {
    public title: string;
    public text: string;
    public icon: SweetAlertIcon;
    public footer: string;
    public background: string;
    public showConfirmButton: boolean;
    public toast: boolean;
    public showCancelButton: boolean;
    public buttonsStyling: boolean;
    public focusConfirm: boolean;
    public focusCancel: boolean;
    public showCloseButton: boolean;
    public confirmButtonText: string;
    public cancelButtonText: string;
    public confirmButtonClass: string;
    public cancelButtonClass: string;
    public timer: number;

    constructor() {
        this.icon = constants.SWEET_ALERT_SUCCESS;
        this.toast = constants.SWEET_ALERT_SWEET;
        this.background = constants.SWEET_ALERT_BG_DEFAULT;
        this.showConfirmButton = constants.SWEET_ALERT_SHOW_CONFIRM_BUTTOM;
        this.showCancelButton = constants.SWEET_ALERT_SHOW_CANCEL_BUTTOM;
        this.confirmButtonText = constants.SWEET_ALERT_CONFIRM;
        this.cancelButtonText = constants.SWEET_ALERT_CANCEL;
        this.showCloseButton = constants.SWEET_ALERT_CLOSE;
        this.confirmButtonClass = constants.SWEET_ALERT_CONFIRM_CLASS;
        this.cancelButtonClass = constants.SWEET_ALERT_CANCEL_CLASS;
        this.buttonsStyling = constants.SWEET_ALERT_BUTTON_STYLIN;
    }
}
