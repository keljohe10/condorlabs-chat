import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../providers/login.service';
import { ChatgroupService } from '../../providers/chatgroup.service';
import { Mensaje } from '../../interfaces/chat.interfaces';

@Component({
  selector: 'app-chat-user',
  templateUrl: './chat-user.component.html',
  styleUrls: ['./chat-user.component.css']
})
export class ChatUserComponent implements OnInit {

correo: string;
mensaje: string;
elemento: any;
chats: any[] = [];
chatprue: Mensaje[] = [];
user: any []  = [];

  constructor(private _activatedRoute: ActivatedRoute,  public _cs: ChatgroupService, private _loginServices: LoginService) {

    this._activatedRoute.params.subscribe(params => {
                  this.correo = params['id'];
                  this._cs.showPhoto(this.correo).subscribe( () => {
                          this.user = this._cs.users;
                    });
                });
                this._cs.showMessages()
                              .subscribe( () => {
                                this.chatprue = [];
                                 for (const value of this._cs.chatUser) {
                                     // tslint:disable-next-line:max-line-length
                                     if (value.nombre.indexOf(this._loginServices.user.name) >= 0 || value.destinatario.indexOf(this._loginServices.user.name) >= 0) {
                                         this.chatprue.push(value);
                                    }
                                 }
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

    this._cs.addMessageUser(this.mensaje, this.correo)
          .then( () => this.mensaje = '')
            .catch( (err) => console.error('Error enviando', err));
  }


}
