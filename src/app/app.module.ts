import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

//Componentes y servicios
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { UsuarioProvider } from '../providers/usuario/usuario';
import { UbicacionProvider } from '../providers/ubicacion/ubicacion';
import { CrearCuentaPage } from '../pages/crear-cuenta/crear-cuenta';
import { PedidosPage } from '../pages/pedidos/pedidos';
import { AgregarSeguimientoPage } from '../pages/agregar-seguimiento/agregar-seguimiento';
import { LocalesPage } from '../pages/locales/locales';
import { DetalleLocalPage } from '../pages/detalle-local/detalle-local';

//Modulos de AngularFirebase
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/auth';


//Archivo de config para FireBase
import { firebaseConfig } from '../config/firebase.config';

//Plugin del storage
import { IonicStorageModule } from '@ionic/storage';

//Plugin de Geolocalizacion
import { Geolocation } from '@ionic-native/geolocation';

//Plugin de google maps
import { AgmCoreModule } from '@agm/core';

import { NgxErrorsModule } from '@ultimate/ngxerrors';





@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    CrearCuentaPage,
    PedidosPage,
    AgregarSeguimientoPage,
    LocalesPage,
    DetalleLocalPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    IonicStorageModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCNrSxTaaXtAZy3Wtucs6voOjCxJGpuujM'
    }),
    NgxErrorsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    CrearCuentaPage,
    PedidosPage,
    AgregarSeguimientoPage,
    LocalesPage,
    DetalleLocalPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UsuarioProvider,
    UbicacionProvider,
    Geolocation,
    AngularFireAuth
  ]
})
export class AppModule {}
