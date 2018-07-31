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
    this.usersCollection = this.afs.collection<any>('users')
    this.portfolioCollection = this.afs.collection<any>('portfolio')
  }

  ngOnInit() {
    this.isLoading = true
    this.getApprovalList()
  }

  async getApprovalList() {
    this.approvalList = []

    let data = await this.usersCollection.ref
      .where('type', '==', 'Provider')
      // .where('whitelistSubmitted', '==', true)
      .where('whitelisted', '==', false)
      .where('whitelistRejected', '==', false).get()
    data.forEach(record => {
      const provider = record.data()
      this.approvalList.push(provider)
    })
    this.isLoading = false
  }

  async approve(uid: string, index: number) {
    const provider = this.approvalList[index]
    provider.whitelisted = true
    provider.badge = 'Ambassador'

    try {
      await this.usersCollection.doc(uid).update(provider)
      this.getApprovalList()
    } catch (error) {
      console.log(error)
    }

    // API call to send an email...
  }

  async reject(uid: string, index: number) {
    const provider = this.approvalList[index]
    provider.whitelistRejected = true

    try {
      await this.usersCollection.doc(uid).update(provider)
      this.getApprovalList()
    } catch (error) {
      console.log(error)
    }

    // API call to send an email...
  }
}
