import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { UsuarioProvider } from '../usuario/usuario';
import { Subscription } from 'rxjs';
import { Platform } from 'ionic-angular';


@Injectable()
export class UbicacionProvider {


  constructor(private geolocation: Geolocation, private afDB: AngularFirestore,
              private _usuarioProv: UsuarioProvider,public platform: Platform) {

  }



}
