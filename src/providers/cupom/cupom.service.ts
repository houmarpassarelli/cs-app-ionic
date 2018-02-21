import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection} from 'angularfire2/firestore';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CupomProvider {

  constructor(private db: AngularFirestore) {}

  retrieveAll(): Observable<any>{
    return this.db.collection('cupom').snapshotChanges().map((res) => {
      return res.map((valores) => ({cid: valores.payload.doc.id, ...valores.payload.doc.data()}));
    });
  }

  retrievePerPack(pid: string): Observable<any>{
    return this.db.collection('cupom', ref => ref.where('pacote','==', pid).orderBy('titulo')).snapshotChanges().map((res) => {
      return res.map((valores => ({cid: valores.payload.doc.id, ...valores.payload.doc.data()})));
    });
  }

}
