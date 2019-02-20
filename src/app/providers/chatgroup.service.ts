import { LoginService } from './login.service';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Mensaje } from '../interfaces/chat.interfaces';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ChatgroupService {

private itemsCollection: AngularFirestoreCollection<any>;
private itemsCollectionChat: AngularFirestoreCollection<any>;
private userCollection: AngularFirestoreCollection<any>;
public chats: Mensaje[] = [];
public chatUser: Mensaje[] = [];
public usuario: any = {};
public users: any[] = [];

  constructor(private afs: AngularFirestore, private _loginServices: LoginService) { }

  CargarMensajes() {
    this.itemsCollection = this.afs.collection<Mensaje>('chats', ref => ref.orderBy('fecha', 'asc'));
    return this.itemsCollection.valueChanges()
                      .pipe(map( (data: Mensaje[]) => {
                        this.chats = data;
                      }));
  }

  AgregarMensaje(texto: string) {
      const mensajes: Mensaje = {
        nombre: this._loginServices.user.name,
        mensajes: texto,
        fecha: new Date().getTime(),
        uid: this._loginServices.user.uid
    };
    return this.itemsCollection.add(mensajes);
  }
   showMessages() {
     this.itemsCollectionChat = this.afs.collection<Mensaje>('chatUsers', ref => ref.orderBy('fecha', 'asc'));
    return this.itemsCollectionChat.valueChanges()
                      .pipe(map( (data: Mensaje[]) => {
                        this.chatUser = data;
                      }));
  }

  addMessageUser(text, addressee) {
    let fechas = new Date().getTime();
    let fecha2 = fechas.toString();

    // Add a new document in collection "users"
     const messages: Mensaje = {
        nombre: this._loginServices.user.name,
        mensajes: text,
        fecha: new Date().getTime(),
        uid: fecha2,
        destinatario: addressee

    };
    return this.itemsCollectionChat.add(messages);

  }
  showPhoto(user) {
      this.userCollection = this.afs.collection<any>('users', ref => ref.where('name', '==', user));
      return this.userCollection.valueChanges()
                        .pipe(map( (data: any) => {
                          this.users = data;
                        }));
    }
}
