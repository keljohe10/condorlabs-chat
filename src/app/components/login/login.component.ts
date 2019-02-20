import { LoginService } from '../../providers/login.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  constructor(public _loginServices: LoginService) { }

  ngOnInit() {
  }

  login() {
    this._loginServices.login();
  }

}
