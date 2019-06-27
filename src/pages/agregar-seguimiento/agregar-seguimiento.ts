import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PedidosPage } from '../pedidos/pedidos';

@IonicPage()
@Component({
  selector: 'page-agregar-seguimiento',
  templateUrl: 'agregar-seguimiento.html',
})
export class AgregarSeguimientoPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AgregarSeguimientoPage');
  }

  atras(){
    this.navCtrl.setRoot(PedidosPage);
  }

}
