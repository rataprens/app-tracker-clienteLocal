import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DetalleLocalPage } from '../detalle-local/detalle-local';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { HomePage } from '../home/home';
import { AngularFirestore } from '@angular/fire/firestore';
import { UbicacionProvider } from '../../providers/ubicacion/ubicacion';


@IonicPage()
@Component({
  selector: 'page-locales',
  templateUrl: 'locales.html',
  providers: [HomePage]
})
export class LocalesPage {

  locales : any;

  constructor(public db:AngularFirestore, public _ubicacionProv:UbicacionProvider,public navCtrl: NavController, public navParams: NavParams, public _usuarioProv:UsuarioProvider) {

    this.db.collection('locales').valueChanges().subscribe((data:any)=>{
      this.locales = data;
      console.log(this.locales);
    });

    this.db.collection('locales').doc('bonsai').collection('movil').doc('jose-1').valueChanges().subscribe(data=>{
      console.log(data);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LocalesPage');
  }

  salir(){
    this._usuarioProv.signOut();
    this._ubicacionProv.detenerGeolocalizacion();
  }

  detallesLocal(){
    this.navCtrl.setRoot(DetalleLocalPage);
  }

}
