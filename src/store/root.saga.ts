import { all } from 'redux-saga/effects';

import { NotificationsSagas } from './notifications';
import { AuthSagas } from './auth';
import { ProductSagas } from './products';
import { CustomerSagas } from './customers';

export function* rootSaga() {
  yield all([
    ...AuthSagas,
    ...NotificationsSagas,
    ...ProductSagas,
    ...CustomerSagas,
  ]);
}
