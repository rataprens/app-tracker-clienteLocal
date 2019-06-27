import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CrearCuentaPage } from './crear-cuenta';

@NgModule({
  declarations: [
    CrearCuentaPage,
  ],
  imports: [
    IonicPageModule.forChild(CrearCuentaPage),
  ],
})
export class CrearCuentaPageModule {}
