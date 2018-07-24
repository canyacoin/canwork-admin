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

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isDaoLogin = false;

  constructor(
    private route: ActivatedRoute,
    private store: Store<any>,
    private canworkAdminEthService: CanWorkAdminEthService,
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
    Promise.all([this.canworkAdminEthService.isAdmin(), this.canworkAdminEthService.isOwner()])
      .then(result => {

        if (result[0]) {
          return this.store.dispatch(new UserAuthenticatedAction({
            role: UserRole.SysAdmin,
            isAuthenticated: true
          }));
        }

        if (result[1]) {
          return this.store.dispatch(new UserAuthenticatedAction({
            role: UserRole.SysOwner,
            isAuthenticated: true
          }));
        }

        return this.store.dispatch(new OperationFailedAction({ error: { messge: 'User is not authorised!' } }));
      });

  }
}
