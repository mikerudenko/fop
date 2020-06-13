import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import {
  showErrorNotification,
  showSuccessNotification,
} from '../notifications';
import { CustomersSlice } from './customers.slice';
import { MetaThunk } from '../../app.types';
import {
  getCustomerList,
  updateCustomer,
  deleteCustomer,
  Customer,
} from '../../api';

const {
  GetCustomerListRequest,
  GetCustomerListSuccess,
  GetCustomerListError,
  UpdateCustomerRequest,
  UpdateCustomerSuccess,
  UpdateCustomerError,
  DeleteCustomerRequest,
  DeleteCustomerSuccess,
  DeleteCustomerError,
} = CustomersSlice.actions;

export function* getCustomerListSaga() {
  try {
    const customers = yield call(getCustomerList);
    yield put(GetCustomerListSuccess(customers));
  } catch (error) {
    yield put(showErrorNotification('Помилка при отриманні списку споживачів'));
    yield put(GetCustomerListError());
  }
}

export function* updateCustomerSaga(
  action: PayloadAction<Customer, string, MetaThunk>,
) {
  try {
    yield call(updateCustomer, action.payload);
    yield put(UpdateCustomerSuccess(action.payload, action.meta));
    yield put(showSuccessNotification('Споживач успішно відредагований'));
  } catch {
    yield put(
      showErrorNotification(
        'Помилка при редагуванні споживача, спробуйте ще раз',
      ),
    );
    yield put(UpdateCustomerError(null, action.meta, true));
  }
}

export function* deleteCustomerSaga(
  action: PayloadAction<string, string, MetaThunk>,
) {
  try {
    yield call(deleteCustomer, action.payload);
    yield put(DeleteCustomerSuccess(action.payload, action.meta));
    yield put(showSuccessNotification('Споживача успішно видалено'));
  } catch {
    yield put(
      showErrorNotification(
        'Помилка при видаленні споживача, спробуйте ще раз',
      ),
    );
    yield put(DeleteCustomerError(null, action.meta, true));
  }
}

export const CustomerSagas = [
  takeLatest(GetCustomerListRequest.type, getCustomerListSaga),
  takeEvery(UpdateCustomerRequest.type, updateCustomerSaga),
  takeEvery(DeleteCustomerRequest.type, deleteCustomerSaga),
];
