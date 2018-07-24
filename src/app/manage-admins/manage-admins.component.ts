import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { OperationSuccededAction } from 'src/app/_state/actions/common.action';
import { CanWorkAdminEthService, MultiSigOperations } from 'src/app/services/eth/canwork-admin-eth.service';

@Component({
  selector: 'app-manage-admins',
  templateUrl: './manage-admins.component.html',
  styleUrls: ['./manage-admins.component.css']
})
export class ManageAdminsComponent implements OnInit {

  isLoading = false;
  address: string;
  admins = [];
  signers = [];

  constructor(private canworkAdminEthService: CanWorkAdminEthService, private store: Store<any>) { }

  ngOnInit() {
    this.listAdmins();
  }

  listAdmins() {
    this.isLoading = true;
    this.canworkAdminEthService.getAdmins()
      .then(_admins => this.admins = _admins)
      .then(() => this.isLoading = false);

    return false;
  }

  add() {
    this.canworkAdminEthService.addAdmin(this.address)
      .then((tx: any) => {
        if (tx && tx.status) {
          this.address = '';
          this.store.dispatch(new OperationSuccededAction({ message: 'Admin has been added successfully!' }));
          setTimeout(() => this.listAdmins(), 2000);
        }
      });
  }

  remove(address) {
    this.canworkAdminEthService.removeAdmin(address)
      .then((tx: any) => {
        if (tx && tx.status) {
          this.store.dispatch(new OperationSuccededAction({ message: 'Admin has been removed successfully!' }));
          setTimeout(() => this.listAdmins(), 2000);
        }
      });
  }

}
