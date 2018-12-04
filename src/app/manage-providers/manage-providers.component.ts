import { Component, OnInit, Input } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-manage-providers',
  templateUrl: './manage-providers.component.html',
  styleUrls: ['./manage-providers.component.scss']
})
export class ManageProvidersComponent implements OnInit {

  usersCollection: AngularFirestoreCollection<any>;
  portfolioCollection: AngularFirestoreCollection<any>;
  approvalList: any[];
  isLoading: boolean;
  body = document.getElementById('app-body');

  @Input() rejection = {
    displayModal: false,
    reason: '',
    uid: '',
    index: 0,
  };

  constructor(
    private afs: AngularFirestore,
    private http: HttpClient) {
    this.usersCollection = this.afs.collection<any>('users');
    this.portfolioCollection = this.afs.collection<any>('portfolio');
  }

  ngOnInit() {
    this.isLoading = true;
    this.getApprovalList();
  }

  async getApprovalList() {
    this.approvalList = [];

    const data = await this.usersCollection.ref
      .where('type', '==', 'Provider')
      .where('whitelisted', '==', false)
      .where('whitelistRejected', '==', false).get();
    data.forEach(record => {
      const provider = record.data();
      this.approvalList.push(provider);
    });
    this.isLoading = false;
  }

  async approve(uid: string, index: number) {
    const provider = this.approvalList[index];
    provider.whitelisted = true;

    try {
      await this.usersCollection.doc(uid).update(provider);
      this.getApprovalList();
    } catch (error) {
      console.error(error);
    }
  }

  onReject(uid: string, index: number) {
    this.rejection.displayModal = true;
    this.rejection.uid = uid;
    this.rejection.index = index;
    this.body.classList.add('hide-overflow-y');
  }

  closeModal() {
    this.rejection.displayModal = false;
    this.body.classList.remove('hide-overflow-y');
  }

  async reject() {
    const provider = this.approvalList[this.rejection.index];
    provider.whitelistRejected = true;

    try {
      await this.usersCollection.doc(this.rejection.uid).update(provider);
      this.getApprovalList();
    } catch (error) {
      console.error(error);
    }

    const endPoint = `${environment.backendURI}/canyaSupportNotification`;
    return this.http.post(endPoint, {
      emailAddress: provider.email,
      message: `${this.rejection.reason}`,
      subject: `You CanWork application was rejected`,
    }).toPromise()
      .then(res => {
        console.log(res);
        this.rejection.displayModal = false;
      })
      .catch(error => console.error(error));
  }
}
