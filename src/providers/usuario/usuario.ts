import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Storage } from '@ionic/storage';
import { Platform } from 'ionic-angular';
import { Subscription } from 'rxjs';


@Injectable()
export class UsuarioProvider {

  clave:string ;
  empresa:string;
  user:any = {};
  private doc: Subscription;

  constructor( private afDB: AngularFirestore, private storage: Storage, private platform:Platform) {
    console.log('Hello UsuarioProvider Provider');

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
          this.storage.set('clave', this.clave);
      }else{
        //Escritorio
          localStorage.setItem('clave', this.clave);
      }   
  }

  cargarStorage(){
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
    
  }

  borrarStorage(){
    this.clave = null;
    if (this.platform.is('cordova')) {
      //Celular
      this.storage.remove("clave");
    }else{
      //Escritorio
      localStorage.removeItem("clave");
    }

    this.doc.unsubscribe();
  }

}
