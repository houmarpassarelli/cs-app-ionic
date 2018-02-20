import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';

@Injectable()
export class UsuarioService {  

  constructor(/*public db: AngularFireDatabase,*/
              private db: AngularFirestore){}

  create(uid: string, dados: Object): Promise<any>{
      
      return this.db.collection('usuario').doc(uid).set(dados);
  }

}
