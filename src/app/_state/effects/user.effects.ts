import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, tap, mergeMap, switchMap, map } from 'rxjs/operators';
import { Observable, ObservableInput } from 'rxjs';
import { DaoService } from 'src/app/services/dao.service';
import { DAO_AUTHENTICATE, DAOAuthenticatedAction, DAO_AUTHENTICATED } from 'src/app/_state/actions/dao.action';
import { OperationFailedAction, NavigateAction } from 'src/app/_state/actions/common.action';
import { AlertService } from 'src/app/services/alert.service';
import { UserService } from 'src/app/services/user.service';
import { USER_SIGNOUT, USER_AUTHENTICATED } from 'src/app/_state/actions/user.action';
import { UserRole } from 'src/app/_state/reducers/user.reducer';

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private daoService: DaoService,
    private alert: AlertService,
    private userService: UserService
  ) { }

  @Effect()
  userSignOut$: Observable<Action> = this.actions$.pipe(
    ofType(USER_SIGNOUT),
    map((action) => {
      this.userService.logout();
      return new NavigateAction({ url: ['/signin'] });
    })
  );

  @Effect()
  userAuthenticated$: Observable<Action> = this.actions$.pipe(
    ofType(USER_AUTHENTICATED),
    map((action) => {
      this.userService.set(action['payload']);

      if (action['payload'].role === UserRole.SysAdmin) {
        return new NavigateAction({ url: ['/dashboard-admin'] });
      }

      if (action['payload'].role === UserRole.SysOwner) {
        return new NavigateAction({ url: ['/dashboard-owner'] });
      }

      if (action['payload'].role === UserRole.DaoUser) {
        return new NavigateAction({ url: ['/dashboard'] });
      }

      return new OperationFailedAction({ error: { message: 'Invalid user role!' } });
    })
  );
}
