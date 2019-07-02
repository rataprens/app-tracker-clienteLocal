import { Component } from '@angular/core';
import { Platform, NavController, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { UsuarioProvider, Credenciales } from '../providers/usuario/usuario';
import { Storage } from '@ionic/storage';
import { PedidosPage } from '../pages/pedidos/pedidos';
import { LocalesPage } from '../pages/locales/locales';
import { AngularFireAuth } from '@angular/fire/auth/auth';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  usuario:Credenciales = {};
  rootPage:any;

  constructor(public storage:Storage,
     public menu:MenuController ,platform: Platform, statusBar: StatusBar,
      splashScreen: SplashScreen, public _usuarioProv: UsuarioProvider , public afAuth:AngularFireAuth) {
    //Cuando la plataforma esta cargada
    platform.ready().then(() => {

        statusBar.styleDefault();
          
      });


      this._usuarioProv.afAuth.authState.subscribe(
        user => {

          if(user){
            var currentUser = afAuth.auth.currentUser;
            if(currentUser.displayName){
              console.log('hay nombre')
              this.usuario.nombre = currentUser.displayName;
            }else{
              console.log('no hay nombre');
              this.usuario.nombre = 'Nombre';
            }
            this.usuario.email = currentUser.email;
            this.usuario.provider = currentUser.providerId;
            this.usuario.uid = currentUser.uid
            if(currentUser.photoURL){
              console.log('si hay foto');
              this.usuario.imagen = currentUser.photoURL;
            }else{
              console.log('no hay foto');
              this.usuario.imagen = '../assets/imgs/photoUser.png';
            }
            console.log(this.usuario);
            this.rootPage = HomePage;
            this.menu.swipeEnable(true);
          }else{
            this.rootPage = LoginPage;
            this.menu.swipeEnable(false);
          }
        },
        ()=>{
          this.rootPage = LoginPage;
        }
      );
  }

  abrirPedidos(){
    this.rootPage = PedidosPage;
  }

  abrirMapa(){
    this.rootPage = HomePage;
  }

  abrirListaLocales(){
    this.rootPage = LocalesPage;
  }

  abrirAjustes(){

  }
}

