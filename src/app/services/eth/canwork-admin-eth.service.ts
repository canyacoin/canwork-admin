import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { EthService } from '@canyaio/canpay-lib';
import { Store } from '@ngrx/store';

import { OperationFailedAction } from 'src/app/_state/actions/common.action';
import { canworkAdmin } from 'src/app/contracts';
import { environment } from 'src/environments/environment';

const ROLE_OWNER = 'owner';
const ROLE_ADMIN = 'admin';

export enum MultiSigOperations {
  addOwner = 'addOwner',
  removeOwner = 'removeOwner',
  emergencyTransfer = 'emergencyTransfer',
}

@Injectable()
export class CanWorkAdminEthService extends EthService {
  private canWorkAdminContract: any;
  private canWorkAdminAddress = environment.contracts[environment.contracts.network].canworkAdmin;

  constructor(private store: Store<any>, http: Http) {
    super({ useTestNet: environment.contracts.useTestNet }, http);
    this.initContract();
  }

  private initContract(abi = canworkAdmin.abi, address = this.canWorkAdminAddress) {
    console.log(`CanWorkAdminEthService: initContract(${address})`);
    return this.canWorkAdminContract = this.createContractInstance(abi, address);
  }

  isOwner(userAddress: string = this.getOwnerAccount()): Promise<boolean> {
    if (!this.isValidAddress(userAddress)) {
      return this.handleError({ message: 'Invalid eth address!' });
    }

    return this.canWorkAdminContract.methods.hasRole(userAddress, ROLE_OWNER)
      .call()
      .catch(this.handleError.bind(this));
  }

  isAdmin(userAddress: string = this.getOwnerAccount()): Promise<boolean> {
    if (!this.isValidAddress(userAddress)) {
      return this.handleError({ message: 'Invalid eth address!' });
    }

    return this.canWorkAdminContract.methods.hasRole(userAddress, ROLE_ADMIN)
      .call()
      .catch(this.handleError.bind(this));
  }

  getAdmins() {
    return this.canWorkAdminContract.methods.getRoleMembersCount(this.web3js.utils.asciiToHex(ROLE_ADMIN))
      .call()
      .then(count => {
        const admins = [];

        for (let i = 0; i < count; i++) {
          admins.push(this.canWorkAdminContract.methods.getRoleMember(this.web3js.utils.asciiToHex(ROLE_ADMIN), i).call());
        }

        return Promise.all(admins)
          .then(ownerAddresses => ownerAddresses.filter(record => { console.log(record); return record[1] === true; }));
      })
      .catch(this.handleError.bind(this));
  }

  getOwners() {
    return this.initContract().methods.getRoleMembersCount(this.web3js.utils.asciiToHex(ROLE_OWNER))
      .call()
      .then(count => {
        const owners = [];

        console.log('ownersCount: ', count);

        for (let i = 0; i < count; i++) {
          owners.push(this.canWorkAdminContract.methods.getRoleMember(this.web3js.utils.asciiToHex(ROLE_OWNER), i).call());
        }

        return Promise.all(owners)
          .then(ownerAddresses => ownerAddresses.filter(record => { console.log(record); return record[1] === true; }));
      })
      .catch(this.handleError.bind(this));
  }

  addAdmin(userAddress, from = this.getOwnerAccount()): Promise<boolean> {
    if (!this.isValidAddress(userAddress)) {
      return this.handleError({ message: 'Invalid eth address!' });
    }

    const functionSignature = this.canWorkAdminContract.methods.addAdmin(userAddress).encodeABI();
    return this.web3js.eth.estimateGas({ from, to: this.canWorkAdminAddress, data: functionSignature })
      .then(gas => {
        const txOptions = { from, ...this.getDefaultGasParams(), gas: gas + 10000 };
        return this.canWorkAdminContract.methods.addAdmin(userAddress)
          .send(txOptions)
          .then(tx => this.getTransactionReceiptMined(tx.transactionHash));
      })
      .catch(this.handleError.bind(this));
  }

  removeAdmin(userAddress, from = this.getOwnerAccount()): Promise<boolean> {
    if (!this.isValidAddress(userAddress)) {
      return this.handleError({ message: 'Invalid eth address!' });
    }

    const functionSignature = this.canWorkAdminContract.methods.removeAdmin(userAddress).encodeABI();
    return this.web3js.eth.estimateGas({ from, to: this.canWorkAdminAddress, data: functionSignature })
      .then(gas => {
        const txOptions = { from, ...this.getDefaultGasParams(), gas: gas + 10000 };
        return this.canWorkAdminContract.methods.removeAdmin(userAddress)
          .send(txOptions)
          .then(tx => this.getTransactionReceiptMined(tx.transactionHash));
      })
      .catch(this.handleError.bind(this));
  }

  addOwner(userAddress, from = this.getOwnerAccount()): Promise<boolean> {
    if (!this.isValidAddress(userAddress)) {
      return this.handleError({ message: 'Invalid eth address!' });
    }

    const functionSignature = this.canWorkAdminContract.methods.addOwner(userAddress).encodeABI();
    return this.web3js.eth.estimateGas({ from, to: this.canWorkAdminAddress, data: functionSignature })
      .then(gas => {
        const txOptions = { from, ...this.getDefaultGasParams(), gas: gas + 10000 };
        return this.canWorkAdminContract.methods.addOwner(userAddress)
          .send(txOptions)
          .then(tx => this.getTransactionReceiptMined(tx.transactionHash));
      })
      .catch(this.handleError.bind(this));
  }

  removeOwner(userAddress, from = this.getOwnerAccount()): Promise<boolean> {
    if (!this.isValidAddress(userAddress)) {
      return this.handleError({ message: 'Invalid eth address!' });
    }

    const functionSignature = this.canWorkAdminContract.methods.removeOwner(userAddress).encodeABI();
    return this.web3js.eth.estimateGas({ from, to: this.canWorkAdminAddress, data: functionSignature })
      .then(gas => {
        const txOptions = { from, ...this.getDefaultGasParams(), gas: gas + 10000 };
        return this.canWorkAdminContract.methods.removeOwner(userAddress)
          .send(txOptions)
          .then(tx => this.getTransactionReceiptMined(tx.transactionHash));
      })
      .catch(this.handleError.bind(this));
  }

  emergencyTransfer(toAddress, from = this.getOwnerAccount()): Promise<boolean> {
    if (!this.isValidAddress(toAddress)) {
      return this.handleError({ message: 'Invalid eth address!' });
    }

    const functionSignature = this.canWorkAdminContract.methods.emergencyTransfer(toAddress).encodeABI();
    return this.web3js.eth.estimateGas({ from, to: this.canWorkAdminAddress, data: functionSignature })
      .then(gas => {
        const txOptions = { from, ...this.getDefaultGasParams(), gas: gas + 10000 };
        return this.canWorkAdminContract.methods.emergencyTransfer(toAddress)
          .send(txOptions)
          .then(tx => this.getTransactionReceiptMined(tx.transactionHash));
      })
      .catch(this.handleError.bind(this));
  }

  getSigners(operation, address) {
    if (!this.isValidAddress(address)) {
      return this.handleError({ message: 'Invalid eth address!' });
    }

    return this.canWorkAdminContract.methods.getOperationSignersCount(this.web3js.utils.asciiToHex(operation), address)
      .call()
      .then(count => {
        const signers = [];

        for (let i = 0; i < count; i++) {
          signers.push(this.canWorkAdminContract.methods.getOperationSigner(this.web3js.utils.asciiToHex(operation), address, i).call());
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
