import { ChatgroupService } from '../../providers/chatgroup.service';
import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../providers/login.service';

/*
Author: Kelvin José Hernandez Cabrera
@Desc: Component for group chat
--------------------------------------
	Variables:
	@Name:message
	@Desc: message sent through the group chat

  @Name:element
	@Desc: container of messages on the screen
--------------------------------------
	Function:
 
  @Name: sendMessage
	@Desc: send message by calling the message sending provider (_cs.addMessages)
*/


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styles: []
})
export class ChatComponent implements OnInit {

  message: string;
  element: any;
  constructor( public _cs: ChatgroupService, private _loginServices: LoginService) {
    // Subscription for loading messages
    this._cs.loadMessages()
        .subscribe( () => {
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

    this._cs.addMessages(this.message)
            .then( () => this.message = '')
            .catch( (err) => console.error('Error', err));
  }

}
