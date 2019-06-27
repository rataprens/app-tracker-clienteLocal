import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AgregarSeguimientoPage } from '../agregar-seguimiento/agregar-seguimiento';
import { HomePage } from '../home/home';
import { UsuarioProvider } from '../../providers/usuario/usuario';


@IonicPage()
@Component({
  selector: 'page-pedidos',
  templateUrl: 'pedidos.html',
  providers: [HomePage]
})
export class PedidosPage {

  constructor(public _usuarioProv:UsuarioProvider, public home:HomePage, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PedidosPage');
  }

  salir(){
    this._usuarioProv.signOut();
    this.home.detenerGeolocalizacion();
  }  

  comenzarSeguimiento(){
    this.navCtrl.setRoot(AgregarSeguimientoPage);
  }

}
