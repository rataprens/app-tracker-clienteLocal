import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Storage } from '@ionic/storage';
import { Platform } from 'ionic-angular';
import { Subscription } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth/auth';
import * as firebase from 'firebase/app';


@Injectable()
export class UsuarioProvider {
  userAuth: firebase.User;
  clave:string ;
  empresa:string;
  user:any = {};
  private doc: Subscription;
  usuario: Credenciales = {}

  constructor(public afAuth:AngularFireAuth, private afDB: AngularFirestore, private storage: Storage, private platform:Platform) {
     
    afAuth.authState.subscribe(user=>{
      this.userAuth = user;
    });

  }

  cargarUsuario(nombre:string, email:string, imagen:string, uid:string, provider:string){
    this.usuario.nombre = nombre;
    this.usuario.email = email;
    this.usuario.imagen = imagen;
    this.usuario.uid = uid;
    this.usuario.provider = provider;
  }

  get authenticated(): boolean {
      return this.userAuth !== null;
  }

  signOut(): Promise<void>{
    this.borrarStorage();
    return this.afAuth.auth.signOut();
  }

  getEmail() {
    return this.user && this.user.email;
  }

  signInWithEmail(credentials){

    console.log("sign in with email");
    return this.afAuth.auth.signInWithEmailAndPassword(credentials.email, credentials.password);

  }


  signInWithFacebook(){
    console.log("sign in with facebook");
    return this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider()).then(res =>{
      console.log(res);
      let user = res.user;
      this.cargarUsuario(
        user.displayName,
        user.email,
        user.photoURL,
        user.uid,
        'facebook'
      );
      this.guardarStorage();
    });
  }
  
  signInWithGoogle(){
  }

  signup(credentials){
    console.log("sign up");
    return this.afAuth.auth.createUserWithEmailAndPassword(credentials.email, credentials.password);
  }

  verificarUsuario(clave:string, empresa:string){
    
    //Recibe la clave y la transforma a miniscula
    this.clave = clave
    this.empresa = empresa.toLocaleLowerCase();

    //El metodo retorna una promesa
    return new Promise((resolve, reject) =>{
      
      //Hacemos referencia al objeto y nos subscribimos
      this.doc =  this.afDB.collection(`${this.empresa}`).doc(`cliente`).collection(`rooms`).doc(`${this.clave}`)
            .valueChanges().subscribe(data =>{
              //Si existe la data
              if(data){
                //Correcto
                console.log(data);
                this.clave = clave;
                this.user = data;
                this.guardarStorage();
                resolve(true);
              }else{
                //Incorrecto
                console.log(data);
                resolve(false);
              }

            });
    });
  }

  guardarStorage(){
    //Verificamos en que plataforma estamos
      if(this.platform.is('cordova')){
        //Celular
          this.storage.set('nombre', this.usuario.nombre);
          this.storage.set('email', this.usuario.email);
          this.storage.set('imagen', this.usuario.imagen);
          this.storage.set('uid', this.usuario.uid);
          this.storage.set('provider', this.usuario.provider);
      }else{
        //Escritorio
          localStorage.setItem('nombre', this.usuario.nombre);
          localStorage.setItem('email', this.usuario.email);
          localStorage.setItem('imagen', this.usuario.imagen);
          localStorage.setItem('uid', this.usuario.uid);
          localStorage.setItem('provider', this.usuario.provider);
      }   
  }

/*   cargarStorage(){
    //Retornamos una promesa
    return new Promise((resolve, reject)=>{
      //Verificamos en que plataforma estamos
        if(this.platform.is('cordova')){
          //Celular
          this.storage.get('clave').then( val=>{
            //Si existe Valor
            if(val){
              //Correcto
              this.clave = val;
              resolve(true);
            }else{
              //Incorrecto
              resolve(false);
            }
          });
        }else{
          //Escritorio
            if(localStorage.getItem('clave')){
                this.clave = localStorage.getItem('clave');
                resolve(true)
            }else{
                resolve(false);
            }
        }
    });
    
  } */

  borrarStorage(){
    this.clave = null;
    if (this.platform.is('cordova')) {
      //Celular
      this.storage.remove("nombre");
      this.storage.remove("email");
      this.storage.remove("imagen");
      this.storage.remove("uid");
      this.storage.remove("provider");
    }else{
      //Escritorio
      localStorage.removeItem("nombre");
      localStorage.removeItem("email");
      localStorage.removeItem("imagen");
      localStorage.removeItem("uid");
      localStorage.removeItem("provider");
    }
    if(this.doc){ 
        this.doc.unsubscribe();
    }
  }

}

export interface Credenciales{
nombre ?: string
email ?: string
imagen ?: string
uid ?: string
provider ?: string
}