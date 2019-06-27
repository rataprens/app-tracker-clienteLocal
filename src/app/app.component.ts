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

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  usuario:Credenciales = {};
  rootPage:any;

  constructor(public storage:Storage, public menu:MenuController ,platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public _usuarioProv: UsuarioProvider) {
    //Cuando la plataforma esta cargada
    platform.ready().then(() => {

        statusBar.styleDefault();
          
      });

      this._usuarioProv.afAuth.authState.subscribe(
        user => {

          if(user){

            if(platform.is('cordova')){
              this.storage.get('nombre').then(nombre=>{
                this.usuario.nombre = nombre;
              });
              this.storage.get('email').then(email=>{
                this.usuario.email = email;
              });
              this.storage.get('imagen').then(imagen=>{
                this.usuario.imagen = imagen;
              }); 
              this.storage.get('uid').then(uid=>{
                this.usuario.uid = uid;
              });
              this.storage.get('provider').then(provider=>{
                this.usuario.provider = provider;
              });
            }else{
              this.usuario.nombre = localStorage.getItem('nombre');
              this.usuario.email = localStorage.getItem('email');
              this.usuario.imagen = localStorage.getItem('imagen');
              console.log(this.usuario.imagen);
              this.usuario.uid = localStorage.getItem('uid');
              this.usuario.provider = localStorage.getItem('provider');
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

