import { all } from 'redux-saga/effects';

import { NotificationsSagas } from './notifications';
import { AuthSagas } from './auth';
import { ProductSagas } from './products';

export function* rootSaga() {
  yield all([...AuthSagas, ...NotificationsSagas, ...ProductSagas]);
}
