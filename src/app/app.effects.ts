import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, tap, mergeMap } from 'rxjs/operators';
import { Observable, ObservableInput } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { ActionTypes, AppAction } from './app.store';
import { UserService } from './services/user.service';

@Injectable()
export class UserEffects {
  constructor(private actions$: Actions, private userService: UserService) { }

  @Effect({ dispatch: false })
  userVerified$: Observable<Action> = this.actions$.pipe(
    ofType(ActionTypes.USER_VERIFIED),
    tap(action => {
      this.userService.setVerificationStatus(true);
    })
  );

  @Effect({ dispatch: false })
  userAuthenticated$: Observable<Action> = this.actions$.pipe(
    ofType(ActionTypes.USER_AUTHENTICATED),
    tap((action: AppAction) => {
      this.userService.setAuthenticationStatus(true);
      this.userService.setIsClient(true);
      this.userService.setPermissions(action.payload.permissions);
    })
  );

  @Effect({ dispatch: false })
  userSignedOut$: Observable<Action> = this.actions$.pipe(
    ofType(ActionTypes.USER_SIGNEDOUT),
    tap(action => {
      this.userService.setAuthenticationStatus(false);
      this.userService.setIsClient(false);
    })
  );
}
