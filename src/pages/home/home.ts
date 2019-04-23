import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { UbicacionProvider } from '../../providers/ubicacion/ubicacion';
import { LoginPage } from '../login/login';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { AngularFirestore } from '@angular/fire/firestore';
import swal from 'sweetalert';
import { Subscription } from 'rxjs';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
  lat: number = 51.678418;
  lng: number = 7.809007;
  user: any = {};
  empresa: string ;
  nombreConductor: string;
  claveConductor: string;
  claveUnica: string;
  estado: Subscription;

  constructor(public navCtrl: NavController, 
              public _ubicacionProv: UbicacionProvider, 
              public platform: Platform,
              public _usuarioProv: UsuarioProvider,
              private db:AngularFirestore) {
        
                 
              }
    ionViewDidLoad(){
              this.platform.ready().then(()=>{
                  this.user = this._usuarioProv.user;
                  this.empresa = this.user.empresa;
                  this.nombreConductor = this.user.nombre;
                  this.claveConductor = this.user.clave;
                  this.claveUnica = this._usuarioProv.clave;
                  console.log(this.claveUnica);
                  this.estado =  this.db.collection(`${this.empresa}`).doc('cliente')
                          .collection('rooms').doc(`${this.claveUnica}`).valueChanges().subscribe(data=>{
                            if(data){
                              this.db.collection(`${this.empresa}`).doc('movil').collection('usuarios').doc(`${this.claveConductor}`).valueChanges().subscribe((data:any)=>{
                                console.log("ROOM ACTIVA");
                                console.log(data);
                                this.lat = data.lat;
                                this.lng = data.lng;
                              })
                            }else{
                              console.log("ROOM DESACTIVADA");
                              swal("La ruta ya expiro", "muchas gracias!","warning", {
                                className: "swal-color"
                              })
                              this._usuarioProv.borrarStorage()
                              this.navCtrl.setRoot(LoginPage);
                            }
                          });
              });


  }

  salir(){
   
    this._usuarioProv.borrarStorage();
    this.navCtrl.setRoot( LoginPage);
    this.estado.unsubscribe();

  }

}
