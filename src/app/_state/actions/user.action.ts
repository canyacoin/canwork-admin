import { Action } from '@ngrx/store';

export const USER_SIGNOUT = '[USER] Signout';
export const USER_AUTHENTICATED = '[USER] Authenticated';

export class UserSignOutAction implements Action {
  readonly type = USER_SIGNOUT;
  constructor(public payload: any) { }
}

export class UserAuthenticatedAction implements Action {
  readonly type = USER_AUTHENTICATED;
  constructor(public payload: any) { }
}

export type Actions
  = UserSignOutAction |
  UserAuthenticatedAction;
