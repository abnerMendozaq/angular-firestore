import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { RecepcionBean } from '../models/recepcion-bean';

@Injectable({
  providedIn: 'root'
})
export class PublicacionService {
  public publicaciones$: Observable<any[]>;
  private coleccion = 'recepciones';
  constructor(
    private firestore: AngularFirestore
  ) { }
  public recepcionLista(): Observable<RecepcionBean[]> {
    const colleccion = this.firestore.collection<RecepcionBean>(this.coleccion);
    return colleccion.valueChanges();
  }
  public guardarRecepcion(recepcion: RecepcionBean) {
    return new Promise<any>((resolve, reject) => {
      recepcion.idRecepcion = this.firestore.createId();
      this.firestore
        .collection(this.coleccion).doc(recepcion.idRecepcion)
        .set(recepcion)
        .then(res => { }, err => reject(err));
    });
  }
  public unaRecepcion(idRecepcion: string): Observable<RecepcionBean[]> {
    const colleccion = this.firestore.collection<RecepcionBean>(this.coleccion, ref => ref.where('idRecepcion', '==', idRecepcion));
    return colleccion.valueChanges();
  }
  public editarRecepcion(idRecepcion: string, recepcion: RecepcionBean) {
    return new Promise<any>((resolve, reject) => {
      recepcion.idRecepcion = this.firestore.createId();
      this.firestore
        .collection(this.coleccion).doc(idRecepcion)
        .update(recepcion)
        .then(res => { }, err => reject(err));
    });
  }
  public eliminarRecepcion(idRecepcion: string) {
    return this.firestore
      .collection(this.coleccion)
      .doc(idRecepcion)
      .delete();
  }
}
