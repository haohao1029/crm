import { Injectable } from '@angular/core';
declare const $: any;

@Injectable({
  providedIn: 'root'
})
export class MicroService {

  constructor() { }
  showNotification(type: string, message:string) {
    // const type = ['', 'info', 'success', 'warning', 'danger', 'rose', 'primary'];
    $.notify({
        icon: 'notifications',
        message: message
    }, {
        type: type,
        timer: 1000,
        placement: {
            from: "top",
            align: "center"
        },
        template: '<div data-notify="container" class="col-xs-11 col-sm-3 alert alert-{0} alert-with-icon" role="alert">' +
          '<button mat-raised-button type="button" aria-hidden="true" class="close" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
          '<i class="material-icons" data-notify="icon">notifications</i> ' +
          '<span data-notify="title">{1}</span> ' +
          '<span data-notify="message">{2}</span>' +
          '<div class="progress" data-notify="progressbar">' +
            '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
          '</div>' +
          '<a href="{3}" target="{4}" data-notify="url"></a>' +
        '</div>'
    });
  }
  toCapitalize (noCapitalize) {
    return noCapitalize.toUpperCase() + noCapitalize.slice(1);
  }
}
