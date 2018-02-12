import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

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
              private db: AngularFireDatabase) {
    
              this.loading.present();

  }

  ionViewWillEnter(){
    this.pacotes = this.db.list(`/pacote`).snapshotChanges().map(res => {
      return res.map(valores => ({key : valores.payload.key, ... valores.payload.val()}));
    });
  }
}
