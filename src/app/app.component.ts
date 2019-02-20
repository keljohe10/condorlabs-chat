import { ProfileService } from './providers/profile.service';
import { LoginService } from './providers/login.service';
import { Observable } from 'rxjs/internal/Rx';
import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ChatFire';
  navType = 'list';

  constructor(public _loginServices: LoginService) {

  }

  nav(type) {
    if (type === 'list') {
      this.navType = 'list';
    } else if (type === 'group') {
      this.navType = 'group';
    } else {
      this.navType = 'profile';
    }
  }
}
