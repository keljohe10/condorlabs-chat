import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

// Components
import { LoginComponent } from './components/login/login.component';
import { GroupChatComponent } from './components/group-chat/group-chat.component';
import { ChatComponent } from './components/chat/chat.component';
import { ChatUserComponent } from './components/chat-user/chat-user.component';
import { ProfileComponent } from './components/profile/profile.component';

// Route
import { AppRoutingModule } from './app.routes';

// Pipe img
import { ImagePipe } from './pipe/image.pipe';

// Firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule, FirestoreSettingsToken } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    GroupChatComponent,
    ChatComponent,
    ChatUserComponent,
    ProfileComponent,
    ImagePipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule // imports firebase/storage only needed for storage features

  ],
  providers: [{ provide: FirestoreSettingsToken, useValue: {} }],
  bootstrap: [AppComponent]
})
export class AppModule { }
