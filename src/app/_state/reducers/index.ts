import { storeFreeze } from 'ngrx-store-freeze';
import { ActionReducer, combineReducers, createSelector, compose } from '@ngrx/store';

import { environment } from '../../../environments/environment';
import * as fromCommon from './common.reducer';
import * as fromDao from './dao.reducer';
import * as fromUser from './user.reducer';

export interface State {
  user: fromUser.State;
  dao: fromDao.State;
  common: fromCommon.State;
}

export const reducers = {
  user: fromUser.reducer,
  dao: fromDao.reducer,
  common: fromCommon.reducer,
};

// export state & entities/props to be used from components as `store.select(getUserState)`
export const getCommonState = (state: State) => state.common;
export const getLoadingStatus = createSelector(getCommonState, fromCommon.getLoadingStatus);

export const getDaoState = (state: State) => state.dao;
export const getDaoUser = createSelector(getDaoState, fromDao.getDaoUser);
export const getDaoTask = createSelector(getDaoState, fromDao.getDaoTask);

export const getUserState = (state: State) => state.user;
export const getUser = createSelector(getUserState, fromUser.getUser);

