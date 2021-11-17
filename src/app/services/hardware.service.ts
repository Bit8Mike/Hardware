import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HardwareService {

  constructor(private firestore: AngularFirestore) { }

  addHardware(hardware: any): Promise<any> {
    return this.firestore.collection('hardware').add(hardware);
  }

  getHardware(): Observable<any> {
    return this.firestore.collection('hardware', ref => ref.orderBy('nombre', 'asc')).snapshotChanges();
  }

  deleteHardware(id: string) {
    return this.firestore.collection('hardware').doc(id).delete();
  }

  getOneHardware(id: string): Observable<any> {
    return this.firestore.collection('hardware').doc(id).snapshotChanges();
  }

  updateHardware(id: string, data: any): Promise<any> {
    return this.firestore.collection('hardware').doc(id).update(data);
  }
}
