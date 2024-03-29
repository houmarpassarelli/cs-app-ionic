import { Component, OnInit } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFireAuth } from 'angularfire2/auth';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { AutenticacaoService } from '../providers/autenticacao/autenticacao.service';



@Component({
  templateUrl: 'app.html'
})
export class csGHR implements OnInit{
  rootPage: any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private auth: AngularFireAuth) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  ngOnInit(): void{
    // (this.autenticacao.authenticaded) ? this.rootPage = HomePage : this.rootPage = LoginPage;
    this.auth.auth.onAuthStateChanged((usuario) => {
      (usuario) ? this.rootPage = HomePage : this.rootPage = LoginPage;
    });
  }
}

