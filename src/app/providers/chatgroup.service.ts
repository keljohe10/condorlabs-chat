import { LoginService } from './login.service';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Message } from '../interfaces/chat.interfaces';
import { map } from 'rxjs/operators';

/*
Author: Kelvin José Hernandez Cabrera
@Desc: group chat service
--------------------------------------
	Variables:
	@Name: itemsCollectionChat
	@Desc: chatUser collection in the firebase database

  @Name:itemsCollection
	@Desc: chats collection in the firebase database

  @Name:chats
	@Desc: data of the chats collection

  @Name:chatUser
	@Desc: data of the chatUser collection

--------------------------------------
	Function:

  @Name: loadMessages
	@Desc: load data to the chats collection

  @Name: addMessages
	@Desc: add data to the chats collection

  @Name: showMessages
	@Desc: load data to the chatUser collection

  @Name: addMessageUser
	@Desc: add data to the chatUser collection

*/


@Injectable({
  providedIn: 'root'
})
export class ChatgroupService {

private itemsCollection: AngularFirestoreCollection<any>;
private itemsCollectionChat: AngularFirestoreCollection<any>;
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
    // Add a new document in collection "chats"
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

    // Add a new document in collection "chatUsers"
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
