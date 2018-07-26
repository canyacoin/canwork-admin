import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { OperationSuccededAction } from 'src/app/_state/actions/common.action';
import { CanWorkAdminEthService, MultiSigOperations } from 'src/app/services/eth/canwork-admin-eth.service';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-manage-admins',
  templateUrl: './manage-admins.component.html',
  styleUrls: ['./manage-admins.component.css']
})
export class ManageAdminsComponent implements OnInit {
  pendingQ = {};
  $admins: Observable<any>;
  isLoading = false;
  address: string;
  admins = [];
  signers = [];

  constructor(
    private authService: AuthService,
    private canworkAdminEthService: CanWorkAdminEthService,
    private store: Store<any>
  ) { }

  ngOnInit() {
    this.refreshWhitelistedAdmins();
    this.displayAdmins();
  }

  displayAdmins() {
    this.$admins = this.authService.getAdmins().valueChanges();
  }

  refreshWhitelistedAdmins() {
    this.isLoading = true;
    this.canworkAdminEthService.getAdmins()
      .then(_admins => this.admins = _admins)
      .then(() => this.isLoading = false);
  }

  isWhiteListed(ethAddress = '') {
    return this.admins.find(admin => admin[0].toUpperCase() === ethAddress.toUpperCase());
  }

  add(ethAddress = this.address) {
    this.pendingQ[ethAddress] = true;
    this.canworkAdminEthService.addAdmin(ethAddress)
      .then((tx: any) => {
        if (tx && tx.status) {
          this.address = '';
          this.store.dispatch(new OperationSuccededAction({ message: 'Admin has been added successfully!' }));
          setTimeout(() => this.refreshWhitelistedAdmins(), 2000);
        }
      })
      .catch(() => this.pendingQ[ethAddress] = false)
      .then(() => this.pendingQ[ethAddress] = false);
  }

  remove(ethAddress) {
    this.pendingQ[ethAddress] = true;
    this.canworkAdminEthService.removeAdmin(ethAddress)
      .then((tx: any) => {
        if (tx && tx.status) {
          this.store.dispatch(new OperationSuccededAction({ message: 'Admin has been removed successfully!' }));
          setTimeout(() => this.refreshWhitelistedAdmins(), 2000);
        }
      })
      .catch(() => this.pendingQ[ethAddress] = false)
      .then(() => this.pendingQ[ethAddress] = false);
  }

}
