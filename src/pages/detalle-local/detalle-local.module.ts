import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetalleLocalPage } from './detalle-local';

@NgModule({
  declarations: [
    DetalleLocalPage,
  ],
  imports: [
    IonicPageModule.forChild(DetalleLocalPage),
  ],
})
export class DetalleLocalPageModule {}
