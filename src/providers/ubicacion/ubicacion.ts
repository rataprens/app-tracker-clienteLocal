import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import { AngularFirestore } from '@angular/fire/firestore';
import { UsuarioProvider } from '../usuario/usuario';
import { Subscription } from 'rxjs';
import { Platform, AlertController } from 'ionic-angular';

@Injectable()
export class UbicacionProvider {

  user: Usuario = {};
  watchSub: Subscription;

  constructor(private geolocation: Geolocation, private afDB: AngularFirestore,
              private _usuarioProv: UsuarioProvider,public platform: Platform, public alertCtrl:AlertController) {




  }

    
  iniciarGeolocalizacion(){

      this.geolocation.getCurrentPosition().then((resp) => {
        if(resp.coords){
          console.log(resp);
          this.user.lat = resp.coords.latitude;
          this.user.lng = resp.coords.longitude;
        }else{
          this.user.lat = -36.786176;
          this.user.lng = -73.076736;
          console.log('no hay data de coordenadas');
        }
       }).catch((error) => {
           console.log('Error getting location', error);
           const alert = this.alertCtrl.create({
             title: 'Ha ocurrido un error con la geolocalizacion',
             message : `el error es el siguiente: ${error}`
           })
           alert.present();
       });
       
        let watch = this.geolocation.watchPosition();

        this.watchSub = watch.subscribe((data) => {
        // data can be a set of coordinates, or an error (if an error occurred).
          if(data.coords){
            console.log(data);
            this.user.lat = data.coords.latitude;
            this.user.lng = data.coords.longitude;
          }else{
            this.user.lat = -36.786176;
            this.user.lng = -73.076736;
            console.log('no hay data de coordenadas');
          }
       });
    
    

  }
  
  detenerGeolocalizacion(){
    this.watchSub.unsubscribe();
  }
 


}

export interface Usuario {
  lat?: number
  lng?:number
}
