import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, tap, mergeMap } from 'rxjs/operators';
import { Observable, ObservableInput } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { DaoService } from 'src/app/services/dao.service';
import { DAO_AUTHENTICATE, DAOAuthenticatedAction, DAO_AUTHENTICATED } from 'src/app/_state/actions/dao.action';
import { OperationFailedAction, NavigateAction } from 'src/app/_state/actions/common.action';
import { AlertService } from 'src/app/services/alert.service';
import { UserService } from 'src/app/services/user.service';
import { USER_SIGNOUT } from 'src/app/_state/actions/user.action';

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private daoService: DaoService,
    private alert: AlertService,
    private userService: UserService
  ) { }

  @Effect()
  userSignOut$: Observable<Action> = this.actions$
    .ofType(USER_SIGNOUT)
    .map((action) => {
      this.userService.logout();
      return new NavigateAction({ url: ['/signin'] });
    });
}
