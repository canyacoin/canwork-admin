import { Store, combineReducers } from '@ngrx/store';
import { Storage } from './utils/storage';

// types
export interface User {
  isClient: boolean;
  isVerified: boolean;
  isAuthenticated: boolean;
  permissions: Array<string>;
}
export interface AppState {
  user: User;
}
export interface State {
  app: AppState;
}
export interface AppAction {
  type: string; payload: any;
}

// state
export const initAppState: AppState = {
  user: Storage.getObject('CANYA_CORE_USER') // { isVerified: false, isAuthenticated: false }
};

export const initialState: State = {
  app: initAppState,
  // router: ''
};

// actions
export const ActionTypes = {
  USER_VERIFIED: 'USER_VERIFIED',
  USER_AUTHENTICATED: 'USER_AUTHENTICATED',
  USER_SIGNEDOUT: 'USER_SIGNEDOUT'
};

// reducer
export function appReducer(state: AppState, action: AppAction): AppState {
  console.log('state: ', state);
  switch (action.type) {

    case ActionTypes.USER_VERIFIED: {
      const user = Object.assign({}, state.user);
      user.isVerified = action.payload.isVerified;
      return { ...state, user };
    }

    case ActionTypes.USER_AUTHENTICATED: {
      const user = Object.assign({}, state.user);
      user.isClient = action.payload.isClient;
      user.isAuthenticated = action.payload.isAuthenticated;
      user.permissions = action.payload.permissions;
      return { ...state, user };
    }

    case ActionTypes.USER_SIGNEDOUT: {
      const user = Object.assign({}, state.user);
      user.isClient = false;
      user.isAuthenticated = false;
      return { ...state, user };
    }

    default: {
      return initAppState;
    }
  }
}
