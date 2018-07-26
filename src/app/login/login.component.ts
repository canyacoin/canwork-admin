import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { DaoService } from 'src/app/services/dao.service';
import { DAOAuthenticateAction } from 'src/app/_state/actions/dao.action';
import { CanWorkAdminEthService } from 'src/app/services/eth/canwork-admin-eth.service';
import { UserService } from 'src/app/services/user.service';
import { NavigateAction, OperationFailedAction } from 'src/app/_state/actions/common.action';
import { UserAuthenticatedAction } from 'src/app/_state/actions/user.action';
import { UserRole } from 'src/app/_state/reducers/user.reducer';
import { AuthService } from 'src/app/services/auth.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isDaoLogin = false;
  isLoading = false;
  status: string;
  pin: string;
  roles = [];

  constructor(
    private route: ActivatedRoute,
    private store: Store<any>,
    private canworkAdminEthService: CanWorkAdminEthService,
    private authService: AuthService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.route.queryParams
      .subscribe(params => {
        if (params.daoAuthToken) {
          this.isDaoLogin = true;
          this.store.dispatch(new DAOAuthenticateAction({ daoAuthToken: params.daoAuthToken }));
        }
      });
  }

  login() {
    this.isLoading = true;

    Promise.all([
      this.canworkAdminEthService.isOwner(),
      this.canworkAdminEthService.isAdmin(),
      this.authService.isAdmin(this.canworkAdminEthService.getOwnerAccount())
    ])
      .then(result => this.prepareUserRoles(result))
      .then(() => {
        if (this.roles.indexOf(UserRole.SysOwner) > -1) {
          return this.authoriseUser();
        }

        if (this.roles.indexOf(UserRole.SysAdmin) > -1) {
          this.status = 'WaitingAuthPinVerification';
          return this.authService.generateAuthPinCode(this.canworkAdminEthService.getOwnerAccount());
        }

        return this.store.dispatch(new OperationFailedAction({ error: { message: 'User is not authorised!' } }));
      })
      .catch((res) => this.store.dispatch(new OperationFailedAction({ error: (res.error || res) })))
      .then(() => this.isLoading = false);
  }

  prepareUserRoles(result) {
    if (result[0]) {
      this.roles.push(UserRole.SysOwner);
      this.roles.push(UserRole.WhiteListedOwner);
      return;
    }

    if (result[1]) {
      this.roles.push(UserRole.WhiteListedAdmin);
      return;
    }

    if (result[2]) {
      this.roles.push(UserRole.SysAdmin);
      return;
    }
  }

  verifyAuthorisationPin() {
    if (!this.pin || this.pin.trim().length < 4) {
      return this.store.dispatch(new OperationFailedAction({ error: { message: 'Invalid PIN!' } }));
    }

    this.isLoading = true;
    this.authService.verifyAuthPinCode(this.canworkAdminEthService.getOwnerAccount(), this.pin.trim())
      .then((res: any) => firebase.auth().signInWithCustomToken(res.token))
      .then(() => this.authoriseUser())
      .catch((res) => this.store.dispatch(new OperationFailedAction({ error: res.error, title: 'Authorisation Failed' })))
      .then(() => this.isLoading = false);
  }

  authoriseUser() {
    return this.store.dispatch(new UserAuthenticatedAction({
      role: this.roles,
      isAuthenticated: true
    }));
  }

  cancelPinVerification() {
    this.pin = '';
    this.status = null;
  }
}
