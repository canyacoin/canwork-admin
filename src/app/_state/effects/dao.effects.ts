import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, tap, mergeMap, switchMap, map } from 'rxjs/operators';
import { Observable, ObservableInput, of, pipe } from 'rxjs';
// import 'rxjs/add/observable/of';
// import 'rxjs/add/operator/switchMap';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/catch';

import { DaoService } from 'src/app/services/dao.service';
import { DAO_AUTHENTICATE, DAOAuthenticatedAction, DAO_AUTHENTICATED } from 'src/app/_state/actions/dao.action';
import { OperationFailedAction, NavigateAction } from 'src/app/_state/actions/common.action';
import { AlertService } from 'src/app/services/alert.service';
import { UserService } from 'src/app/services/user.service';

@Injectable()
export class DaoEffects {
  constructor(
    private actions$: Actions,
    private daoService: DaoService,
    private alert: AlertService,
    private userService: UserService
  ) { }

  @Effect()
  daoAuthenticate$: Observable<Action> = this.actions$.pipe(
    ofType(DAO_AUTHENTICATE),
    mergeMap(action => {
      return this.daoService.auth(action['payload'].daoAuthToken)
        .pipe(
        map(daoUser => new DAOAuthenticatedAction({ daoUser })),
        catchError(err => {
          return of(new OperationFailedAction({ error: err.error, title: 'DAO Authentication Failed' }));
        })
        );
    })
  );

  @Effect()
  daoAuthenticated$: Observable<Action> = this.actions$.pipe(
    ofType(DAO_AUTHENTICATED),
    map(action => {
      console.log('action: ', action);
      this.userService.update(action['payload'].daoUser);
      this.alert.success('DAO user has been authenticated successfully', 'Successful Authentication');
      return new NavigateAction({ url: ['/dashboard'] });
    })
  );
}
