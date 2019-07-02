import { Component, OnInit } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import { PedidosPage } from '../pedidos/pedidos';
import { UbicacionProvider,Usuario } from '../../providers/ubicacion/ubicacion';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { Subscription } from 'rxjs';

export function removeSpaces(control: AbstractControl) {
  if (control && control.value && !control.value.replace(/\s/g, '').length) {
    control.setValue('');
  }
  return null;
}

interface DatosEmpresa{
  apellido?: string;
  clave?: string;
  compartir?: boolean;
  empresa?: string;
  lat?: number;
  lng?: number;
  nombre?: string;
  }

@Component({
  selector: 'page-agregar-seguimiento',
  templateUrl: 'agregar-seguimiento.html',
})
export class AgregarSeguimientoPage implements OnInit {

  map:any;
  lat: number = -36.786176;
  lng: number = -73.076736;
  usuario:Usuario = {};
  form: FormGroup;
  comenzarSeguimiento:boolean;
  public origin: any;
  public destination: any;
  repartidor:any = {};
  datosRoom:DatosEmpresa = {};
    
  constructor(public navCtrl: NavController,public _usuarioProv:UsuarioProvider ,public fb:FormBuilder ,public navParams: NavParams, public _ubicacionProv:UbicacionProvider) {
    this.usuario = this._ubicacionProv.user;
  }
  
  ngOnInit(){
    this.form = this.fb.group({
        empresa:['', [Validators.required, removeSpaces]],
        codigoSeguimiento:['', [Validators.required, removeSpaces]]
    });

  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad AgregarSeguimientoPage');
  }

  atras(){
    this.navCtrl.setRoot(PedidosPage);
  }

  mapReady(map){
    this.map = map;
  }

  comenzar(){
    let dataFormulario = this.form.value;
    
    console.log(dataFormulario); 
    this._usuarioProv.getRoom(dataFormulario.empresa, dataFormulario.codigoSeguimiento).subscribe((data:DatosEmpresa)=>{
      if(data){
        console.log(data);
        this.origin = { lat: this.usuario.lat, lng: this.usuario.lng };
        this.destination = { lat: data.lat, lng: data.lng };
        this.datosRoom = data;
        this.comenzarSeguimiento = true;
        console.log(this.datosRoom);
          
      }else{
        console.log('no hay info');
      }
    });

    console.log(this.datosRoom.clave, this.datosRoom.empresa);
    
/*     this._usuarioProv.getUbicacionRepartidor(this.datosRoom.empresa, this.datosRoom.clave).subscribe((data:any)=>{
        console.log(data);
    }); */
  }

}
