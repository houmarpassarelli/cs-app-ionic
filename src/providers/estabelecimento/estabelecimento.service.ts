import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection} from 'angularfire2/firestore';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class EstabelecimentoProvider {

  constructor(private db: AngularFirestore) {}
  retrieveAll(): Observable<any>{
    return this.db.collection('estabelecimento').snapshotChanges().map((res) => {
      return res.map((valores) => ({eid: valores.payload.doc.id, ...valores.payload.doc.data()}));
    });
  }
}
