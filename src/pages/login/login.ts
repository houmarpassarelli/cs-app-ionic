import { Observable } from 'rxjs/Observable';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { CadastroPage } from '../cadastro/cadastro';
import { AutenticacaoService } from '../../providers/autenticacao/autenticacao.service';
import { PacotesPage } from '../pacotes/pacotes';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { MeuscuponsPage } from './../meuscupons/meuscupons';
import { AngularFireObject } from 'angularfire2/database/interfaces';
// import { ReactiveFormsModule, Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  // providers : [FormGroup]
})
export class LoginPage {

  // public login: FormGroup;

  public login: any = {};
  private uid: string;
 
  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              // public formBuilder: FormBuilder
              private autenticacao: AutenticacaoService,
              public alertaCtrl : AlertController,
              public loadingCtrl: LoadingController,
              private db : AngularFireDatabase
            ){
              
            }

  novoCadastro(){
    this.navCtrl.push(CadastroPage, {}, {'animation' : 'ios-transition'});
  }

  public loginCommon(): any{
    
    let loading = this.loadingCtrl.create({
      spinner : 'dots',
      content: 'Aguarde, estamos realizando seu acesso...'      
    });      
    loading.present();

    this.autenticacao.loginWithEmail({email: this.login.email, senha: this.login.senha}).then((response) => {      
      this.db.list('/usuario', ref=> ref.orderByChild('uid').equalTo(response.user.uid)).snapshotChanges().subscribe(res =>{
          res.map(valor => {
            loading.dismiss();
            if(valor.payload.val().pacote == undefined)this.navCtrl.setRoot(PacotesPage);
            else this.navCtrl.setRoot(MeuscuponsPage);
          });
      });        
    }, (reject) => {
      loading.dismiss();
      switch(reject.code){
        case 'auth/user-not-found':this.alerta('Email não corresponde a nenhum usuário cadastrado');break;
        case 'auth/invalid-email':this.alerta('O email inserido é inválido! Verifique o email e tente novamente.');break;
        case 'auth/user-disabled':this.alerta('Usuário desativado, por favor entre em contato com o suporte');break;
        case 'auth/wrong-password':this.alerta('Senha digitada incorreta!');break;
        case 'auth/argument-error':this.alerta('Preencha todos os campos para realizar o login!');break;
      }
    });
  }

  alerta(mensagem: string) : any{

    let alert = this.alertaCtrl.create({
      message: mensagem,
      buttons:[{
        text:'Voltar',
        handler : () =>{return true;}
      }]
    });
    alert.present();
  }
}
