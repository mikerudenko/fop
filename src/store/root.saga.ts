import { all } from 'redux-saga/effects';

import { NotificationsSagas } from './notifications';
import { AuthSagas } from './auth';

export function* rootSaga() {
  yield all([...AuthSagas, ...NotificationsSagas]);
}
