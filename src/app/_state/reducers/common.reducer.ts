import { Store } from '@ngrx/store';
import { Storage } from '../../utils/storage';
import { LOADING, OPERATION_FAILED, OPERATION_SUCCEDED, Actions } from '../actions/common.action';
import * as DaoActions from '../actions/dao.action';

export interface State {
  isLoading: boolean;
}

export const initialState = {
  isLoading: false
};

export function reducer(
  state = initialState,
  action: Actions
    | DaoActions.Actions
): State {

  console.log('action: ', action.type, ' - state: ', state);

  switch (action.type) {

    case DaoActions.DAO_AUTHENTICATE:
    case DaoActions.DAO_EXEC_TASK_RECORD:
    case LOADING: {
      return { ...state, isLoading: true };
    }

    case DaoActions.DAO_AUTHENTICATED:
    case DaoActions.DAO_EXEC_TASK_RECORD:
    case OPERATION_SUCCEDED:
    case OPERATION_FAILED: {
      return { ...state, isLoading: false };
    }

    default: {
      return state;
    }
  }
}

export const getLoadingStatus = (state: State) => state.isLoading;
