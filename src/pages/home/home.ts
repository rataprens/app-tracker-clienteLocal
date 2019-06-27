import { Component } from '@angular/core';
import { NavController, Platform, NavParams } from 'ionic-angular';
import { UbicacionProvider } from '../../providers/ubicacion/ubicacion';
import { LoginPage } from '../login/login';
import { UsuarioProvider, Credenciales } from '../../providers/usuario/usuario';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subscription } from 'rxjs';
import { Geolocation } from '@ionic-native/geolocation';

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
  watchSub:Subscription;
  usuario: Credenciales;

  constructor(public navCtrl: NavController, 
              public _ubicacionProv: UbicacionProvider, 
              public platform: Platform,
              public _usuarioProv: UsuarioProvider,
              private db:AngularFirestore,
              public geolocation:Geolocation,
              public navParams:NavParams) {
               
                this.iniciarGeolocalizacion();
                console.log(this._usuarioProv.authenticated);
                this.user = this.navParams.data;
                console.log(this.user);
              }
              
    ionViewDidLoad(){

  }

  salir(){
   
    this._usuarioProv.signOut();
    this.detenerGeolocalizacion();
    this.navCtrl.setRoot(LoginPage);

  }

  iniciarGeolocalizacion(){
    
      this.geolocation.getCurrentPosition().then((resp) => {
        this.lat = resp.coords.latitude
        this.lng = resp.coords.longitude
       }).catch((error) => {
         console.log('Error getting location', error);
       });
       
        let watch = this.geolocation.watchPosition();
        this.watchSub = watch.subscribe((data) => {
        // data can be a set of coordinates, or an error (if an error occurred).
        this.lat = data.coords.latitude
        this.lng = data.coords.longitude
       });
    
  }

  detenerGeolocalizacion(){
    this.watchSub.unsubscribe();
  }

}
