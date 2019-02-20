import { ChatgroupService } from '../../providers/chatgroup.service';
import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../providers/login.service';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styles: []
})
export class ChatComponent implements OnInit {

  mensaje: string;
  elemento: any;
  constructor( public _cs: ChatgroupService, private _loginServices: LoginService) {
    this._cs.CargarMensajes()
        .subscribe( () => {
          setTimeout( () => {
            this.elemento.scrollTop = this.elemento.scrollHeight;
          }, 20);
        });
  }

  ngOnInit() {

    this.elemento = document.getElementById('app-mensajes');
  }

  enviarmensaje() {
    if (this.mensaje.length === 0) {
      return;
    }

    this._cs.AgregarMensaje(this.mensaje)
            .then( () => this.mensaje = '')
            .catch( (err) => console.error('Error enviando', err));
  }

}
