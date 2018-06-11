import { Action } from '@ngrx/store';

export const DAO_AUTHENTICATE = '[DAO] Authenticate';
export const DAO_AUTHENTICATED = '[DAO] Authenticated';
export const DAO_EXEC_TASK_RECORD = '[DAO] Execute Task Record';
export const DAO_EXEC_TASK_RECORD_COMPLETED = '[DAO] Execute Task Record Completed';

export class DAOAuthenticateAction implements Action {
  readonly type = DAO_AUTHENTICATE;
  constructor(public payload: any) { }
}

export class DAOAuthenticatedAction implements Action {
  readonly type = DAO_AUTHENTICATED;
  constructor(public payload: any) { }
}

export class DAOExecTaskRecord implements Action {
  readonly type = DAO_EXEC_TASK_RECORD;
  constructor(public payload: any) { }
}

export class DAOExecTaskRecordCompleted implements Action {
  readonly type = DAO_EXEC_TASK_RECORD_COMPLETED;
  constructor(public payload: any) { }
}

export type Actions
  = DAOAuthenticateAction
  | DAOAuthenticatedAction
  | DAOExecTaskRecord
  | DAOExecTaskRecordCompleted;
