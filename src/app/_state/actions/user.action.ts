import { Action } from '@ngrx/store';

export const USER_SIGNOUT = '[USER] Signout';

export class UserSignOutAction implements Action {
  readonly type = USER_SIGNOUT;
  constructor(public payload: any) { }
}

export type Actions
  = UserSignOutAction;
