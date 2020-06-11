import { push } from 'connected-react-router';
import get from 'lodash/get';
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';

import {
  getUserRole,
  setLocalPersistence,
  signInWithCredentials,
  signOut,
  getAuthData,
  updateAuthData,
} from '../../api/api-auth';
import { ROUTES } from '../../app.constants';
import {
  showErrorNotification,
  showSuccessNotification,
} from '../notifications';
import { AuthSlice } from './auth.slice';

import { AUTH_ERROR_NOTIFICATIONS } from './auth.constants';
import { MetaThunk } from '../../app.types';
import { CredentialsPayload, AuthData } from '../../api/api-auth.types';

const {
  AuthRequest,
  AuthSuccess,
  AuthError,
  SignOutRequest,
  SignOutSuccess,
  SignOutError,
  GetAuthDataRequest,
  GetAuthDataSuccess,
  GetAuthDataError,
  UpdateAuthDataRequest,
  UpdateAuthDataSuccess,
  UpdateAuthDataError,
} = AuthSlice.actions;

const AuthStrategy: any = {
  'sign-in': (payload: CredentialsPayload) => signInWithCredentials(payload),
};

export function* authSaga(
  action: PayloadAction<CredentialsPayload, string, any>,
) {
  const { payload, meta } = action;
  try {
    const { user } = yield call(AuthStrategy[meta.strategy], payload);
    const role = yield call(getUserRole, user);
    yield put(AuthSuccess({ user, role }, meta));
    yield put(push(ROUTES.admin));
    yield put(showSuccessNotification('Ви ввійшли в систему'));
    yield call(setLocalPersistence);
  } catch (error) {
    const { code, message } = error;
    yield put(AuthError(error, meta, true));
    yield put(
      showErrorNotification(get(AUTH_ERROR_NOTIFICATIONS, code, message)),
    );
  }
}

export function* signOutSaga(action: PayloadAction<void, string, MetaThunk>) {
  const { meta } = action;
  try {
    yield call(signOut);
    yield put(SignOutSuccess(null, meta));
    yield put(showSuccessNotification('Ви вийшли з системи'));
    yield put(push(ROUTES.admin));
  } catch (error) {
    const { message } = error;
    yield put(SignOutError(null, meta, true));
    yield put(showErrorNotification(message));
  }
}

export function* getAuthDataSaga() {
  try {
    const data = yield call(getAuthData);
    yield put(GetAuthDataSuccess(data));
  } catch (error) {
    yield put(GetAuthDataError(null));
  }
}

export function* updateAuthDataSaga(action: PayloadAction<Partial<AuthData>>) {
  try {
    yield call(updateAuthData, action.payload);
    yield put(UpdateAuthDataSuccess(action.payload));
  } catch {
    yield put(UpdateAuthDataError(null));
  }
}

export const AuthSagas = [
  takeEvery(AuthRequest.type, authSaga),
  takeEvery(SignOutRequest.type, signOutSaga),
  takeEvery(UpdateAuthDataRequest.type, updateAuthDataSaga),
  takeLatest(GetAuthDataRequest.type, getAuthDataSaga),
];
