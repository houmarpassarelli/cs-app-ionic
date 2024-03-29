
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AutenticacaoService {

  constructor(public autenticacao: AngularFireAuth) {}

  createCommonUser(usuario: {email: string, senha: string}): Promise<any>{
      return this.autenticacao.auth.createUserWithEmailAndPassword(usuario.email,  usuario.senha);
  }

  loginWithEmail(usuario: {email: string, senha: string}): Promise<any>{
    return this.autenticacao.auth.signInAndRetrieveDataWithEmailAndPassword(usuario.email, usuario.senha).then(() => {
      this.autenticacao.auth.setPersistence("local");
    });    
  }

  logOut(): Promise<AngularFireAuth>{
    return this.autenticacao.auth.signOut().then((response) => {
      return response;
    }).catch((error) => {
      return error;
    });
  }

  get authenticaded(): Promise<boolean>{
    return new Promise((resolve, reject) => {
      this.autenticacao.auth.onAuthStateChanged((usuario) => {
        (usuario) ? resolve(true) : reject(false);
      }, (error) => {
        reject(false);
      });
    });
  }
}
