import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LocalesPage } from './locales';

@NgModule({
  declarations: [
    LocalesPage,
  ],
  imports: [
    IonicPageModule.forChild(LocalesPage),
  ],
})
export class LocalesPageModule {}
