import { Store } from '@ngrx/store';
import { Storage } from '../../utils/storage';
import * as DaoActions from '../actions/dao.action';

export interface IDAOUser {
  id: string;
  daoAccessLevel: number;
  isAuthenticated: boolean;
}

export interface IDAOTask {
  status: string;
  completionPoints: number;
}

export interface State {
  isLoading: boolean;
  daoUser: IDAOUser;
  daoTask: IDAOTask;
}

export const initialState = {
  isLoading: false,
  daoUser: Storage.getObject('user'),
  daoTask: { status: '', completionPoints: 0 }
};

export function reducer(state = initialState, action: DaoActions.Actions): State {

  console.log('action: ', action.type, ' - state: ', state);

  switch (action.type) {

    case DaoActions.DAO_AUTHENTICATED: {
      const daoUser = action.payload.daoUser;
      const isLoading = false;
      return { ...state, daoUser, isLoading };
    }

    case DaoActions.DAO_EXEC_TASK_RECORD_COMPLETED: {
      const daoTask = Object.assign({}, action.payload.daoTask);
      const isLoading = false;
      return { ...state, daoTask, isLoading };
    }

    case DaoActions.DAO_AUTHENTICATE:
    case DaoActions.DAO_EXEC_TASK_RECORD: {
      const isLoading = true;
      return { ...state, isLoading };
    }

    default: {
      return state;
    }
  }
}

export const getDaoUser = (state: State) => state.daoUser;
export const getDaoTask = (state: State) => state.daoTask;
