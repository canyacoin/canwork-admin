import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { OperationSuccededAction } from 'src/app/_state/actions/common.action';
import { CanWorkAdminEthService, MultiSigOperations } from 'src/app/services/eth/canwork-admin-eth.service';

@Component({
  selector: 'app-manage-owners',
  templateUrl: './manage-owners.component.html',
  styleUrls: ['./manage-owners.component.css']
})
export class ManageOwnersComponent implements OnInit {
  isLoadingSigners = false;
  isLoading = false;
  address: string;
  owners = [];
  signers = [];

  constructor(private canworkAdminEthService: CanWorkAdminEthService, private store: Store<any>) { }

  ngOnInit() {
    this.listOwners();
  }

  listOwners() {
    this.isLoading = true;
    this.canworkAdminEthService.getOwners()
      .then(_owners => this.owners = _owners)
      .then(() => this.isLoading = false);

    return false;
  }

  add() {
    this.signers = [];
    this.canworkAdminEthService.addOwner(this.address)
      .then((tx: any) => {
        if (tx && tx.status) {
          this.address = '';
          this.store.dispatch(new OperationSuccededAction({ message: 'Owner signature has been added successfully!' }));
          setTimeout(() => this.listOwners(), 2000);
        }
      });
  }

  remove(address) {
    this.canworkAdminEthService.removeOwner(address)
      .then((tx: any) => {
        if (tx && tx.status) {
          this.store.dispatch(new OperationSuccededAction({ message: 'Owner signature has been added successfully!' }));
          setTimeout(() => this.listOwners(), 2000);
        }
      });
  }

  listSigners(address = this.address) {
    this.signers = [];
    this.isLoadingSigners = true;
    this.canworkAdminEthService.getSigners(MultiSigOperations.addOwner, address)
      .then(_signers => this.signers = _signers)
      .finally(() => this.isLoadingSigners = false);

    return false;
  }

}
