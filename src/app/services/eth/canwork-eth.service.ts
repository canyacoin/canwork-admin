import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { EthService } from '@canyaio/canpay-lib';
import { Store } from '@ngrx/store';

import { OperationFailedAction } from 'src/app/_state/actions/common.action';
import { canwork } from 'src/app/contracts';
import { environment } from 'src/environments/environment';

@Injectable()
export class CanWorkEthService extends EthService {
  private canWorkContract: any;
  private canWorkAddress = environment.contracts[environment.contracts.network].canwork;

  constructor(private store: Store<any>, http: Http) {
    super({ useTestNet: environment.contracts.useTestNet }, http);
    this.initContract();
  }

  private initContract(abi = canwork.abi, address = this.canWorkAddress) {
    console.log(`CanWorkEthService: initContract(${address})`);
    return this.canWorkContract = this.createContractInstance(abi, address);
  }

  emergencyTransfer(toAddress, from = this.getOwnerAccount()): Promise<boolean> {
    if (!this.isValidAddress(toAddress)) {
      return this.handleError({ message: 'Invalid eth address!' });
    }

    return this.canWorkContract.methods.emergencyTransfer(toAddress)
      .send({ from, ...this.getDefaultGasParams() })
      .then(tx => this.getTransactionReceiptMined(tx.transactionHash))
      .catch(this.handleError.bind(this));
  }

  getEmergencyTransferSigners(address) {
    if (!this.isValidAddress(address)) {
      return this.handleError({ message: 'Invalid eth address!' });
    }

    return this.canWorkContract.methods.getEmergencyTransferSignersCount(address)
      .call()
      .then(count => {
        const signers = [];

        console.log('signersCount: ', count);

        for (let i = 0; i < count; i++) {
          signers.push(this.canWorkContract.methods.getEmergencyTransferSigner(address, i).call());
        }

        return Promise.all(signers)
          .then(signersAddresses => signersAddresses.filter(record => record[1] === true));
      })
      .catch(this.handleError.bind(this));
  }

  isValidAddress(address) {
    return this.web3js.utils.isAddress(address);
  }

  handleError(err) {
    this.store.dispatch(new OperationFailedAction({ error: { message: err.message } }));
    return Promise.reject(err.message);
  }

}
