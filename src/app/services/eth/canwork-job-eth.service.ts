import { Injectable } from '@angular/core';
import { EthService } from '@canyaio/canpay-lib';
import { environment } from 'src/environments/environment';
import { canworkJob } from 'src/app/contracts';
import { Store } from '@ngrx/store';
import { OperationFailedAction } from 'src/app/_state/actions/common.action';

const ROLE_OWNER = 'owner';
const ROLE_ADMIN = 'admin';

export enum MultiSigOperations {
  addOwner = 'addOwner',
  removeOwner = 'removeOwner',
  emergencyTransfer = 'emergencyTransfer',
}

@Injectable()
export class CanWorkJobEthService extends EthService {
  private canWorkJobContract: any;
  private canWorkJobAddress = environment.contracts.canworkJob;

  constructor(private store: Store<any>) {
    super({ useTestNet: environment.contracts.useTestNet });
    this.initContract();
  }

  private initContract(abi = canworkJob.abi, address = environment.contracts.canworkJob) {
    console.log(`CanWorkJobEthService: initContract(${address})`);
    return this.canWorkJobContract = this.createContractInstance(abi, address);
  }

  isOwner(userAddress: string = this.getOwnerAccount()): Promise<boolean> {
    return this.canWorkJobContract.methods.hasRole(userAddress, ROLE_OWNER)
      .call()
      .catch(this.handleError.bind(this));
  }

  isAdmin(userAddress: string = this.getOwnerAccount()): Promise<boolean> {
    return this.canWorkJobContract.methods.hasRole(userAddress, ROLE_ADMIN)
      .call()
      .catch(this.handleError.bind(this));
  }

  getAdmins() {
    return this.canWorkJobContract.methods.getAdminsCount()
      .call()
      .then(count => {
        const owners = [];

        for (let i = 0; i < count; i++) {
          owners.push(this.canWorkJobContract.methods.getAdmin(i).call());
        }

        return Promise.all(owners)
          .then(ownerAddresses => ownerAddresses.filter(record => record[1] === true));
      })
      .catch(this.handleError.bind(this));
  }

  getOwners() {
    return this.canWorkJobContract.methods.getOwnersCount()
      .call()
      .then(count => {
        const owners = [];

        for (let i = 0; i < count; i++) {
          owners.push(this.canWorkJobContract.methods.getOwner(i).call());
        }

        return Promise.all(owners)
          .then(ownerAddresses => ownerAddresses.filter(record => record[1] === true));
      })
      .catch(this.handleError.bind(this));
  }

  addAdmin(userAddress, from = this.getOwnerAccount()): Promise<boolean> {
    return this.canWorkJobContract.methods.addAdmin(userAddress)
      .send({ from, ...this.getDefaultGasParams() })
      .then(tx => this.getTransactionReceiptMined(tx.transactionHash))
      .catch(this.handleError.bind(this));
  }

  removeAdmin(userAddress, from = this.getOwnerAccount()): Promise<boolean> {
    return this.canWorkJobContract.methods.removeAdmin(userAddress)
      .send({ from, ...this.getDefaultGasParams() })
      .then(tx => this.getTransactionReceiptMined(tx.transactionHash))
      .catch(this.handleError.bind(this));
  }

  addOwner(userAddress, from = this.getOwnerAccount()): Promise<boolean> {
    return this.canWorkJobContract.methods.addOwner(userAddress)
      .send({ from, ...this.getDefaultGasParams() })
      .then(tx => this.getTransactionReceiptMined(tx.transactionHash))
      .catch(this.handleError.bind(this));
  }

  removeOwner(userAddress, from = this.getOwnerAccount()): Promise<boolean> {
    return this.canWorkJobContract.methods.removeOwner(userAddress)
      .send({ from, ...this.getDefaultGasParams() })
      .then(tx => this.getTransactionReceiptMined(tx.transactionHash))
      .catch(this.handleError.bind(this));
  }

  emergencyTransfer(toAddress, from = this.getOwnerAccount()): Promise<boolean> {
    return this.canWorkJobContract.methods.emergencyTransfer(toAddress)
      .send({ from, ...this.getDefaultGasParams() })
      .then(tx => this.getTransactionReceiptMined(tx.transactionHash))
      .catch(this.handleError.bind(this));
  }

  getSigners(operation, address) {
    return this.canWorkJobContract.methods.getOperationSignersCount(this.web3js.utils.asciiToHex(operation), address)
      .call()
      .then(count => {
        const signers = [];

        for (let i = 0; i < count; i++) {
          signers.push(this.canWorkJobContract.methods.getOperationSigner(this.web3js.utils.asciiToHex(operation), address).call());
        }

        return Promise.all(signers)
          .then(signersAddresses => signersAddresses.filter(record => record[1] === true));
      })
      .catch(this.handleError.bind(this));
  }

  handleError(err) {
    this.store.dispatch(new OperationFailedAction({ error: { message: err.message } }));
  }

}
