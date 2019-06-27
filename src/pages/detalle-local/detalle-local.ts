import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LocalesPage } from '../locales/locales';


@IonicPage()
@Component({
  selector: 'page-detalle-local',
  templateUrl: 'detalle-local.html',
})
export class DetalleLocalPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetalleLocalPage');
  }

  atras(){
    this.navCtrl.setRoot(LocalesPage);
  }

}
