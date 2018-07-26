import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { DocumentReference } from '@firebase/firestore-types';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const USERS_COLLECTION = 'users';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  usersCollection: DocumentReference;

  constructor(private db: AngularFirestore, private http: HttpClient) { }

  isAdmin(ethAddress = '') {
    return this.db.collection(USERS_COLLECTION).ref.where('ethAddressLookup', '==', ethAddress.toUpperCase())
      .get()
      .then(res => {

        if (res.docs.length === 0) {
          return false;
        }

        if (res.docs.length > 1) {
          throw new Error('EthAddress associated with more than one user!');
        }

        return res.docs[0].data().isAdmin === true;
      });
  }

  generateAuthPinCode(ethAddress: string): Promise<any> {
    const endPoint = `${environment.backendURI}/generateAuthPinCode`;
    return this.http.post(endPoint, { ethAddress }).toPromise();
  }

  verifyAuthPinCode(ethAddress: string, pin: string) {
    const endPoint = `${environment.backendURI}/ethereumAuthViaPinCode`;
    return this.http.post(endPoint, { ethAddress, pin: parseInt(pin, 10) }).toPromise();
  }

  getAdmins() {
    return this.db.collection(USERS_COLLECTION, ref => ref.where('isAdmin', '==', true));
  }

}
