import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

@Component({
  selector: 'app-manage-providers',
  templateUrl: './manage-providers.component.html',
  styleUrls: ['./manage-providers.component.css']
})
export class ManageProvidersComponent implements OnInit {

  usersCollection: AngularFirestoreCollection<any>;
  portfolioCollection: AngularFirestoreCollection<any>;
  approvalList: any[];
  isLoading: boolean;

  constructor(private afs: AngularFirestore) {
    this.usersCollection = this.afs.collection<any>('users');
    this.portfolioCollection = this.afs.collection<any>('portfolio');
  }

  ngOnInit() {
    this.isLoading = true;
    this.approvalList = [];
    this.getApprovalList();
  }

  getApprovalList() {
    this.usersCollection.ref
      .where('type', '==', 'Provider').get().then(data => {
        data.forEach(record => {
          const r = record.data();
          if (r['state'] !== 'Done') {
            this.portfolioCollection.doc(r.address).collection('work').ref.get().then(portfolio => {
              r.portfolio = portfolio.forEach(work => {
                // Add the portfolio here!!!!
              });
              this.approvalList.push(r);
            })
          }

          //}
        });
      });
    console.log('+ this.approvalList', this.approvalList);
    this.isLoading = false;
  }

  approve(uid: string) {
    // Update state = Done

    // API call to send a email...
  }

  reject(uid: string) {

  }

}
