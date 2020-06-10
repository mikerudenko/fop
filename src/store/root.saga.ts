import { all } from 'redux-saga/effects';

import { NotificationsSagas } from './notifications';
import { AuthSagas } from './auth';
import { ProductSagas } from './products';
import { CustomerSagas } from './customers';
import { InvoiceSagas } from './invoices';

export function* rootSaga() {
  yield all([
    ...AuthSagas,
    ...NotificationsSagas,
    ...ProductSagas,
    ...CustomerSagas,
    ...InvoiceSagas,
  ]);
}
