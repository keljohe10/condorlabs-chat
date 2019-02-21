import { ProfileService } from '../../providers/profile.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../providers/login.service';
import { ChatgroupService } from '../../providers/chatgroup.service';
import { Message } from '../../interfaces/chat.interfaces';

@Component({
  selector: 'app-chat-user',
  templateUrl: './chat-user.component.html',
  styleUrls: ['./chat-user.component.css']
})
export class ChatUserComponent implements OnInit {

user: string;
message: string;
element: any;
chats: Message[] = [];
imgUrl: string;

  constructor(private _activatedRoute: ActivatedRoute,
              public _cs: ChatgroupService,
              private _loginServices: LoginService,
              private _profile: ProfileService) {

    this._activatedRoute.params.subscribe(params => {
                  this.user = params['id'];
                });
                this._cs.showMessages()
                              .subscribe( () => {
                                this.chats = [];
                                 for (const value of this._cs.chatUser) {
                                     // tslint:disable-next-line:max-line-length
                                     if (value.name.indexOf(this._loginServices.user.name) >= 0 || value.addressee.indexOf(this._loginServices.user.name) >= 0) {
                                         this.chats.push(value);
                                    }
                                 }
                                      setTimeout( () => {
                                         this.element.scrollTop = this.element.scrollHeight;
                                      }, 20);
                              });

  }

  ngOnInit() {

    this.element = document.getElementById('app-message');

  }
  sendMessage() {

    if (this.message.length === 0) {
      return;
    }

    this._cs.addMessageUser(this.message, this.user)
          .then( () => this.message = '')
            .catch( (err) => console.error('Error', err));
  }


}
