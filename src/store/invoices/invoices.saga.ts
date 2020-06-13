import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import {
  showErrorNotification,
  showSuccessNotification,
} from '../notifications';
import { InvoicesSlice } from './invoices.slice';
import { MetaThunk } from '../../app.types';
import {
  getInvoiceList,
  updateInvoice,
  deleteInvoice,
  Invoice,
} from '../../api';

const {
  GetInvoiceListRequest,
  GetInvoiceListSuccess,
  GetInvoiceListError,
  UpdateInvoiceRequest,
  UpdateInvoiceSuccess,
  UpdateInvoiceError,
  DeleteInvoiceRequest,
  DeleteInvoiceSuccess,
  DeleteInvoiceError,
} = InvoicesSlice.actions;

export function* getInvoiceListSaga() {
  try {
    const invoices = yield call(getInvoiceList);
    yield put(GetInvoiceListSuccess(invoices));
  } catch (error) {
    yield put(showErrorNotification('Помилка при отриманні списку рахунків'));
    yield put(GetInvoiceListError());
  }
}

export function* updateInvoiceSaga(
  action: PayloadAction<Invoice, string, MetaThunk>,
) {
  try {
    yield call(updateInvoice, action.payload);
    yield put(UpdateInvoiceSuccess(action.payload, action.meta));
    yield put(showSuccessNotification('Рахунок успішно відредаговано'));
  } catch {
    yield put(
      showErrorNotification(
        'Помилка при редагуванні рахунку, спробуйте ще раз',
      ),
    );
    yield put(UpdateInvoiceError(null, action.meta, true));
  }
}

export function* deleteInvoiceSaga(
  action: PayloadAction<string, string, MetaThunk>,
) {
  try {
    yield call(deleteInvoice, action.payload);
    yield put(DeleteInvoiceSuccess(action.payload, action.meta));
    yield put(showSuccessNotification('Рахунок успішно видалено'));
  } catch {
    yield put(
      showErrorNotification('Помилка при видаленні рахунку, спробуйте ще раз'),
    );
    yield put(DeleteInvoiceError(null, action.meta, true));
  }
}

export const InvoiceSagas = [
  takeLatest(GetInvoiceListRequest.type, getInvoiceListSaga),
  takeEvery(UpdateInvoiceRequest.type, updateInvoiceSaga),
  takeEvery(DeleteInvoiceRequest.type, deleteInvoiceSaga),
];
