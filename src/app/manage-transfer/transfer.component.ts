import { Component, OnInit } from '@angular/core';
import { CanWorkJobEthService, MultiSigOperations } from 'src/app/services/eth/canwork-job-eth.service';
import { Store } from '@ngrx/store';
import { OperationSuccededAction } from 'src/app/_state/actions/common.action';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css']
})
export class ManageTransferComponent implements OnInit {

  isLoading = false;
  address: string;
  signers = [];

  constructor(private canworkJobEthService: CanWorkJobEthService, private store: Store<any>) { }

  ngOnInit() { }

  listSigners(address = this.address) {
    this.isLoading = true;
    this.canworkJobEthService.getSigners(MultiSigOperations.emergencyTransfer, address)
      .then(_signers => this.signers = _signers)
      .then(() => this.isLoading = false);

    return false;
  }

  transfer() {
    this.canworkJobEthService.emergencyTransfer(this.address)
      .then((tx: any) => {
        if (tx && tx.status) {
          setTimeout(() => this.listSigners(this.address), 2000);
          this.address = '';
          this.store.dispatch(new OperationSuccededAction({ message: 'Transfer signature request has been added successfully!' }));
        }
      });
  }

}
