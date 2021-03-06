import { Router } from '@angular/router';
import { map } from 'rxjs/internal/operators';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';

/*
Author: Kelvin José Hernandez Cabrera
@Desc: Login provider
--------------------------------------
	Variables:
	@Name: user
	@Desc: user

  @Name:token
	@Desc: token

  @Name:itemsCollection
	@Desc: user collection in the firebase database

--------------------------------------
	Function:

  @Name: login
	@Desc: login

  @Name: logout
	@Desc: logout

  @Name: saveUsers
	@Desc: saves user in the database

  @Name: loadUsers
	@Desc: load users of the database

  @Name: setStorage
	@Desc: set user in storage
*/


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public user: any = {};
  public token;
  private itemsCollection: AngularFirestoreCollection<any>;

   constructor(private afs: AngularFirestore, public afAuth: AngularFireAuth) {
     this.saveUsers();
  }
  login() {
    // This gives you a Google Access Token. You can use it to access the Google API.
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }
  logout() {
    this.user.name = '';
    this.user.email = '';
    this.user.uid = '';
    this.user.img = '';
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    // Sign-out successful.
    this.afAuth.auth.signOut();
  }
  saveUsers() {
     this.afAuth.authState.subscribe( user => {
          if (!user) {
            return;
          }
          this.user.name = user.displayName;
          this.user.email = user.email;
          this.user.uid = user.uid;
          this.user.img = user.photoURL;

          this.setStorage( this.user.uid, this.user.email );

          // Add a new document in collection "users"
          this.afs.collection('users').doc(this.user.uid).set({
              name: this.user.name,
              email: this.user.email,
              uid: this.user.uid,
              img: this.user.img
          })
          .then(function() {
              console.log('Document successfully written!');

          })
          .catch(function(error) {
              console.error('Error writing document: ', error);
          });

      });
  }
  loadUser() {
    this.itemsCollection = this.afs.collection<any>('users');
    return this.itemsCollection.valueChanges()
                      .pipe(map( (data: any[]) => {
                        return data;
                      }));
  }
  setStorage(token: string, email: string) {
     localStorage.setItem('token', token);
     localStorage.setItem('user', email);
     this.token = token;
  }

}
