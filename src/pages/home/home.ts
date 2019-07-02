import { Component } from '@angular/core';
import { NavController, Platform, NavParams, AlertController } from 'ionic-angular';
import { UbicacionProvider, Usuario } from '../../providers/ubicacion/ubicacion';
import { LoginPage } from '../login/login';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { Subscription } from 'rxjs';
import { Geolocation } from '@ionic-native/geolocation';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
  lat: number;
  lng: number;
  user:any = {};
  empresa: string ;
  nombreConductor: string;
  claveConductor: string;
  claveUnica: string;
  estado: Subscription;
  watchSub:Subscription;
  usuario: Usuario = {};
  map:any;

  constructor(public navCtrl: NavController, 
              public _ubicacionProv: UbicacionProvider, 
              public platform: Platform,
              public _usuarioProv: UsuarioProvider,
              public geolocation:Geolocation,
              public navParams:NavParams, public alertCtrl:AlertController) {
               
                this._ubicacionProv.iniciarGeolocalizacion();
                console.log(_usuarioProv.authenticated);
                this.usuario = this._ubicacionProv.user;
                console.log(this.usuario);
              }
              
    ionViewDidLoad(){
      console.log('ion view did load');
      
  }

  localizar(){
      console.log('boton Localizar');
      this.map.setCenter({lat:this.usuario.lat, lng:this.usuario.lng});
      this.map.setZoom(16);
  }
  
  salir(){
    this._usuarioProv.signOut();
    this._ubicacionProv.detenerGeolocalizacion();
  }

  mapReadY(map){
    this.map = map;
  }
}
