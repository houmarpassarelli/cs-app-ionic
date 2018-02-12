import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { AngularFireModule, FirebaseAppConfig } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule} from 'angularfire2/auth';
import { ReactiveFormsModule} from '@angular/forms';

import { csGHR } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { CadastroPage } from '../pages/cadastro/cadastro';
import { UsuarioService } from '../providers/usuario/usuario.service';
import { AutenticacaoService } from '../providers/autenticacao/autenticacao.service';
import { PacotesPage } from '../pages/pacotes/pacotes';
import { MeuscuponsPage } from './../pages/meuscupons/meuscupons';
import { InsertPage } from '../pages/insert/insert';



const firebaseConfig: FirebaseAppConfig = {
  apiKey: "AIzaSyCMgOdCmk61yaMXEBl9jmhay-Rmg61XzhA",
  authDomain: "cupomstore-ghr.firebaseapp.com",
  databaseURL: "https://cupomstore-ghr.firebaseio.com",
  // projectId: "cupomstore-ghr",
  storageBucket: "cupomstore-ghr.appspot.com",
  messagingSenderId: "565924246495"
};

@NgModule({
  declarations: [
    CadastroPage,
    csGHR,
    LoginPage,
    HomePage,
    PacotesPage,
    MeuscuponsPage,
    InsertPage
  ],
  imports: [
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    BrowserModule,
    ReactiveFormsModule,
    HttpModule,
    IonicModule.forRoot(csGHR)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    CadastroPage,
    csGHR,
    LoginPage,
    HomePage,
    PacotesPage,
    MeuscuponsPage,
    InsertPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UsuarioService,
    AutenticacaoService
  ]
})
export class AppModule {}
