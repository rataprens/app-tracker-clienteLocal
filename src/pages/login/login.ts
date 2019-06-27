import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides, AlertController, LoadingController } from 'ionic-angular';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { HomePage } from '../home/home';
import swal from 'sweetalert';
import { UbicacionProvider } from '../../providers/ubicacion/ubicacion';
import { CrearCuentaPage } from '../crear-cuenta/crear-cuenta';




@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  
  email:any;
  password:any;
  empresa:string;

  @ViewChild(Slides) slides: Slides

  constructor(public loadingCrl: LoadingController, private alertCtrl: AlertController,
               public navCtrl: NavController, public navParams: NavParams, public _usuarioProv: UsuarioProvider,
               public _ubicacion: UbicacionProvider) {
  }

  ionViewDidLoad() {
    //Cambiamos el tipo de paginacion.
    this.slides.paginationType = 'progress';
    //bloqueamos el swipe para que el usuario no pueda moverse
    this.slides.lockSwipes(true);
    this.slides.freeMode = false;
  }

  irPagina(){
    this.navCtrl.setRoot(HomePage);
  }


  ingresarEmail(){
    //Verificar si el email y el password sean verdaderos
    if(this.email && this.password){
      //S
      let loading = this.loadingCrl.create({
        content: 'Verificando'
      });
  
      loading.present()
        if(this.email != ""){
          if(this.password != ""){
            let credentials = {
              email : this.email,
              password: this.password
            }
            this._usuarioProv.signInWithEmail(credentials).then(()=>{
              loading.dismiss();
              this.slides.lockSwipes(false);
              this.slides.freeMode = true;
              this.slides.slideNext();
              this.slides.lockSwipes(true);
              this.slides.freeMode = false;
            });
          }else{
              console.log("ingrese password");
              loading.dismiss();
          }
        }else{
          console.log("ingrese email");
          loading.dismiss();
        }
    }else{
      console.log("ingrese contraseña")
    }
  }

  ingresarFacebook(){
    this._usuarioProv.signInWithFacebook();
  }

  ingresarGoogle(){
      /* this._usuarioProv.signInWithGoogle().then(
        () => this.navCtrl.setRoot(HomePage),
        error => console.log(error.message)
      ); */
  }

  crearCuenta(){
    this.navCtrl.setRoot(CrearCuentaPage);
  }

}
