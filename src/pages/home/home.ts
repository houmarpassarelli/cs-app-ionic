import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../providers/usuario/usuario.service';
import { LoginPage } from '../login/login';
import { Observable } from 'rxjs/Observable';
import { InsertPage } from '../insert/insert';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private usuarios : Observable<any>;

  constructor(public navCtrl: NavController, private db: AngularFireDatabase, public usuarioService : UsuarioService) {}

  ionViewDidLoad(){
    this.usuarios = this.db.list(`/usuario`).snapshotChanges().map(res => {
      return res.map(valores => ({key : valores.payload.key, ... valores.payload.val()}))
    });
  }

  cadastro(): void{
    this.navCtrl.push(LoginPage);
  }

  exibir(usuario: Usuario): void{
    console.log('Usuario:', usuario);
  }

  insert(): void{
    this.navCtrl.push(InsertPage);
  }

  login(): void{
    this.navCtrl.setRoot(LoginPage);
  }
}
