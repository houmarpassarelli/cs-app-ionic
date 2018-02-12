import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';


@Injectable()
export class AutenticacaoService {

  constructor(public autenticacao: AngularFireAuth) {}

  createCommonUser(usuario: {email: string, senha: string}): Promise<any>{    
      return this.autenticacao.auth.createUserWithEmailAndPassword(usuario.email,  usuario.senha);
  }

  loginWithEmail(usuario: {email: string, senha: string}): Promise<any>{
    return this.autenticacao.auth.signInAndRetrieveDataWithEmailAndPassword(usuario.email, usuario.senha);
  }

}
