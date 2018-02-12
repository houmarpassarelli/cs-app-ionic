import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import { Usuario } from '../../models/usuario.model';

@Injectable()
export class UsuarioService {  

  private usuarios: AngularFireList<Usuario>

  constructor(public db: AngularFireDatabase){
    this.usuarios = this.db.list(`/usuario`);
  }

  create(usuario: Usuario): Promise<any>{
      
      return this.db.object(`/usuario/${usuario.uid}`).set(usuario).then(__=> {return true;}).catch(__=> {return false;});    
      
  }

}
