import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { OperationSuccededAction } from 'src/app/_state/actions/common.action';
import { CanWorkJobEthService, MultiSigOperations } from 'src/app/services/eth/canwork-job-eth.service';

@Component({
  selector: 'app-manage-owners',
  templateUrl: './manage-owners.component.html',
  styleUrls: ['./manage-owners.component.css']
})
export class ManageOwnersComponent implements OnInit {

  isLoading = false;
  address: string;
  owners = [];
  signers = [];

  constructor(private canworkJobEthService: CanWorkJobEthService, private store: Store<any>) { }

  ngOnInit() {
    this.listOwners();
  }

  listOwners() {
    this.isLoading = true;
    this.canworkJobEthService.getOwners()
      .then(_owners => this.owners = _owners)
      .then(() => this.isLoading = false);

    return false;
  }

  add() {
    this.signers = [];
    this.canworkJobEthService.addOwner(this.address)
      .then((tx: any) => {
        if (tx && tx.status) {
          this.address = '';
          this.store.dispatch(new OperationSuccededAction({ message: 'Owner signature has been added successfully!' }));
          setTimeout(() => this.listOwners(), 2000);
        }
      });
  }

  remove(address) {
    this.canworkJobEthService.removeOwner(address)
      .then((tx: any) => {
        if (tx && tx.status) {
          this.store.dispatch(new OperationSuccededAction({ message: 'Owner signature has been added successfully!' }));
          setTimeout(() => this.listOwners(), 2000);
        }
      });
  }

  listSigners(address = this.address) {
    this.signers = [];
    this.isLoading = true;
    this.canworkJobEthService.getSigners(MultiSigOperations.addOwner, address)
      .then(_signers => this.signers = _signers)
      .then(() => this.isLoading = false);

    return false;
  }

}
