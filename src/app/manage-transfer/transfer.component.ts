import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { OperationSuccededAction } from 'src/app/_state/actions/common.action';
import { CanWorkAdminEthService, MultiSigOperations } from 'src/app/services/eth/canwork-admin-eth.service';
import { CanWorkEthService } from 'src/app/services/eth/canwork-eth.service';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css']
})
export class ManageTransferComponent implements OnInit {

  isLoading = false;
  address: string;
  signers = [];

  constructor(
    private canworkEthService: CanWorkEthService,
    private canworkAdminEthService: CanWorkAdminEthService,
    private store: Store<any>
  ) { }

  ngOnInit() { }

  listSigners(address = this.address) {
    this.isLoading = true;
    this.canworkEthService.getEmergencyTransferSigners(address)
      .then(_signers => this.signers = _signers)
      .finally(() => this.isLoading = false);

    return false;
  }

  transfer() {
    this.canworkEthService.emergencyTransfer(this.address)
      .then((tx: any) => {
        if (tx && tx.status) {
          setTimeout(() => this.listSigners(this.address), 2000);
          this.store.dispatch(new OperationSuccededAction({ message: 'Transfer signature request has been added successfully!' }));
        }
      });
  }

}
