import { LoginService } from '../../providers/login.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-group-chat',
  templateUrl: './group-chat.component.html',
  styleUrls: ['./group-chat.component.css']
})
export class GroupChatComponent implements OnInit {

users: any = [];
searchUsers: any = [];
userLogin: string;
flag = true;
alert = false;

  constructor(public _loginServices: LoginService) {
    this.loadUserLogin();
  }
  ngOnInit() {
    this.loadUser();
  }
  loadUserLogin() {
    if (localStorage.getItem('user')) {
      this.userLogin = localStorage.getItem('user');
    } else {
      this.userLogin = '';
    }
  }
  loadUser() {
    this._loginServices.loadUser()
            .subscribe( data => {
              this.users = data;
            });
  }
  onChange(event, text) {
    this.searchUsers = [];
    this.flag = false;
    this.alert = false;
    let textLower = text.toLowerCase();

    if (textLower.length <= 0) {
      this.flag = true;
    }
    for (const value of this.users) {
        let name = value.name.toLowerCase();
          if (name.indexOf(textLower) > -1 ) {
            this.alert = false;
              this.searchUsers.push(value);
          }
          if (this.searchUsers.length <= 0 ) {
            this.alert = true;
          }
    }
  }
}
