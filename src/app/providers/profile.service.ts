import { LoginService } from './login.service';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { map } from 'rxjs/internal/operators';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

private PATH = 'img';
private itemsCollection: AngularFirestoreCollection<any>;
public img: any;
public progress = 0;

  constructor(private db: AngularFirestore, private _loginServices: LoginService) { }

  loadImg( img: File) {
    // Create a root reference
    const storageRef = firebase.storage().ref();
    // Create the file metadata
    const metadata = {
     contentType: 'image/jpeg'
    };
    // Upload file and metadata to the object 'images/mountains.jpg'
    const uploadTask = storageRef.child('img/' + img.name).put(img, metadata);
    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
    (snapshot: firebase.storage.UploadTaskSnapshot) => {
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      this.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      if (this.progress === 100) {
        swal('Successful load', '', 'success');
      }
    },
    (error) => {
      // A full list of error codes is available at
     // https://firebase.google.com/docs/storage/web/handle-errors
     console.error('Unknown error occurred', error );
    },
    () => {
      // Upload completed successfully, now we can get the download URL
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          // Add a new document in collection "img"
          this.db.collection(`${this.PATH}`).doc(this._loginServices.user.uid).set({
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


