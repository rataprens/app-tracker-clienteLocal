import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AgregarSeguimientoPage } from './agregar-seguimiento';

@NgModule({
  declarations: [
    AgregarSeguimientoPage,
  ],
  imports: [
    IonicPageModule.forChild(AgregarSeguimientoPage),
  ],
})
export class AgregarSeguimientoPageModule {}
