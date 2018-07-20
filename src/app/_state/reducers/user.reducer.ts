import { Store } from '@ngrx/store';
import { Storage } from '../../utils/storage';
import * as UserActions from '../actions/user.action';
import * as DaoActions from '../actions/dao.action';

export enum UserRole {
  SysAdmin = 'sysAdmin',
  SysOwner = 'sysOwner',
  DaoUser = 'daoUser',
  None = 'none'
}

export interface IUser {
  id: string;
  isAuthenticated: boolean;
  daoAccessLevel: string;
  role: UserRole;
}

export interface State {
  isLoading: boolean;
  user: IUser;
}

export const initialState = {
  isLoading: false,
  user: Storage.getObject('user'),
};

export function reducer(state = initialState, action: UserActions.Actions | DaoActions.Actions): State {

  console.log('action: ', action.type, ' - state: ', state);

  switch (action.type) {
    case DaoActions.DAO_AUTHENTICATED: {
      const user = action.payload.daoUser;
      const isLoading = false;
      return { ...state, user, isLoading };
    }

    case UserActions.USER_AUTHENTICATED: {
      const user = action.payload;
      const isLoading = false;
      return { ...state, user, isLoading };
    }

    case UserActions.USER_SIGNOUT: {
      const user = { id: null, isAuthenticated: false, daoAccessLevel: null, role: UserRole.None };
      const isLoading = false;
      return { ...state, user, isLoading };
    }

    default: {
      return state;
    }
  }
}

export const getUser = (state: State) => state.user;
