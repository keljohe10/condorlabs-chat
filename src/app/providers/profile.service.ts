import { LoginService } from './login.service';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { FileItem } from '../models/img.model';
import * as firebase from 'firebase';
import { map } from 'rxjs/internal/operators';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

private CARPETA_IMAGENES = 'img';
private itemsCollection: AngularFirestoreCollection<any>;
public img: any;

  constructor(private db: AngularFirestore, private _loginServices: LoginService) { }

  loadImg( img: File) {
    const storageRef = firebase.storage().ref();
    const metadata = {
     contentType: 'image/jpeg'
    };
    const uploadTask = storageRef.child('img/' + img.name).put(img, metadata);

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
    (snapshot) => {
      console.log('algo');
    },
    (error) => {
     console.error('Error al subir', error );
    },
    () => {
      // Upload completed successfully, now we can get the download URL
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                     // Add a new document in collection "img"
          this.db.collection(`${this.CARPETA_IMAGENES}`).doc(this._loginServices.user.uid).set({
              name: img.name,
              url: downloadURL,
              uid: this._loginServices.user.uid
          })
          .then(function() {
              console.log('Document successfully written!');

          })
          .catch(function(error) {
              console.error('Error writing document: ', error);
          });
        });
    });
  }

  showImg() {
    this.itemsCollection = this.db.collection<any>('img', ref => ref.where('uid', '==', this._loginServices.user.uid));
    return this.itemsCollection.valueChanges()
                      .pipe(map( (data: any) => {
                        this.img = data;
                      }));
  }




  }


