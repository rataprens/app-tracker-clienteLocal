import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HomePage } from '../home/home';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { LoginPage } from '../login/login';

@IonicPage()
@Component({
  selector: 'page-crear-cuenta',
  templateUrl: 'crear-cuenta.html',
})
export class CrearCuentaPage implements OnInit {
  
  signupError: string;
  form: FormGroup;
  formInvalido:boolean;
  passwordInvalido:boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, public fb:FormBuilder, public _usuarioProv:UsuarioProvider) {

  }

  ngOnInit() {
    this.form = this.fb.group({
      email:['',[Validators.required, Validators.email]],
      password:['',Validators.compose([Validators.required, Validators.minLength(6)])],
      nombre:['', Validators.compose([Validators.required])],
      apellido:['', Validators.compose([Validators.required])],
      passwordRepetir:['', Validators.compose([Validators.required])]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CrearCuentaPage');
  }

  signup(){
    if(this.form.valid){
      let data = this.form.value;
      if(data.password == data.passwordRepetir){
        let credentials = {
          email: data.email,
          password: data.password,
          nombre: `${data.nombre} ${data.apellido}`
        }
        console.log(credentials.nombre);
        this._usuarioProv.signup(credentials).then(
            ()=> this.navCtrl.setRoot(HomePage, data), 
            error => this.signupError = error.message
          );
        this.formInvalido = false;
      }else{
        this.passwordInvalido = true;
      }
    }else{
      this.formInvalido = true;
    }
  }

  atras(){
      this.navCtrl.setRoot(LoginPage);
  }

}
