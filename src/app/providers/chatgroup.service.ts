import { LoginService } from './login.service';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Message } from '../interfaces/chat.interfaces';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ChatgroupService {

private itemsCollection: AngularFirestoreCollection<any>;
private itemsCollectionChat: AngularFirestoreCollection<any>;
private userCollection: AngularFirestoreCollection<any>;
public chats: Message[] = [];
public chatUser: Message[] = [];

  constructor(private afs: AngularFirestore, private _loginServices: LoginService) { }

  loadMessages() {
    this.itemsCollection = this.afs.collection<Message>('chats', ref => ref.orderBy('date', 'asc'));
    return this.itemsCollection.valueChanges()
                      .pipe(map( (data: Message[]) => {
                        this.chats = data;
                      }));
  }

  addMessages(texto: string) {
      const messages: Message = {
        name: this._loginServices.user.name,
        message: texto,
        date: new Date().getTime(),
        uid: this._loginServices.user.uid
    };
    return this.itemsCollection.add(messages);
  }
   showMessages() {
     this.itemsCollectionChat = this.afs.collection<Message>('chatUsers', ref => ref.orderBy('date', 'asc'));
    return this.itemsCollectionChat.valueChanges()
                      .pipe(map( (data: Message[]) => {
                        this.chatUser = data;
                      }));
  }

  addMessageUser(text, addressee) {
    let date = new Date().getTime();
    let date2 = date.toString();

    // Add a new document in collection "users"
     const messages: Message = {
        name: this._loginServices.user.name,
        message: text,
        date: new Date().getTime(),
        uid: date2,
        addressee: addressee

    };
    return this.itemsCollectionChat.add(messages);

  }

}
