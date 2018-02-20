import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { PacoteProvider } from './../../providers/pacote/pacote.service';
import 'rxjs/operators/map';

@IonicPage()
@Component({
  selector: 'page-pacotes',
  templateUrl: 'pacotes.html',
})
export class PacotesPage {

  loading = this.loadingCtrl.create({
    spinner : 'dots',
    content: 'Aguarde, carregando os pacotes disponíveis...'      
  });

  public pacotes: Observable<any>;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public loadingCtrl: LoadingController,
              private pacoteService: PacoteProvider) {
    
              this.loading.present();

  }

  ionViewDidLoad(){
    this.pacotes = this.pacoteService.retrieveAll().map((dados) => { this.loading.dismiss();return dados;});
  }


  verPacote(id: string): void{
    this.navCtrl.push('', {id: id});
  }
}
