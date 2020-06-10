import { push } from 'connected-react-router';
import get from 'lodash/get';
import { call, put, takeEvery } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';

import {
  getUserRole,
  setLocalPersistence,
  signInWithCredentials,
  signOut,
} from '../../api/api-auth';
import { ROUTES } from '../../app.constants';
import {
  showErrorNotification,
  showSuccessNotification,
} from '../notifications';
import { AuthSlice } from './auth.slice';

import { AUTH_ERROR_NOTIFICATIONS } from './auth.constants';
import { MetaThunk } from '../../app.types';
import { CredentialsPayload } from '../../api/api-auth.types';

const {
  AuthRequest,
  AuthSuccess,
  AuthError,
  SignOutRequest,
  SignOutSuccess,
  SignOutError,
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

export const AuthSagas = [
  takeEvery(AuthRequest.type, authSaga),
  takeEvery(SignOutRequest.type, signOutSaga),
];
