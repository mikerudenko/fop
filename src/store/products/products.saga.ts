import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { showErrorNotification } from '../notifications';
import { ProductsSlice } from './products.slice';
import { MetaThunk } from '../../app.types';
import { getProductList } from '../../api';

const {
  GetProductListRequest,
  GetProductListSuccess,
  GetProductListError,
  UpdateProductRequest,
  UpdateProductSuccess,
  UpdateProductError,
  DeleteProductRequest,
  DeleteProductSuccess,
  DeleteProductError,
} = ProductsSlice.actions;

export function* getProductListSaga() {
  try {
    const products = yield call(getProductList);
    yield put(GetProductListSuccess(products));
  } catch (error) {
    yield put(showErrorNotification('Помилка при отриманні списку продуктів'));
    yield put(GetProductListError());
  }
}

export function* updateProductSaga() {}

export function* deleteProductSaga() {}

export const ProductSagas = [
  takeLatest(GetProductListRequest.type, getProductListSaga),
  takeEvery(UpdateProductRequest.type, updateProductSaga),
  takeEvery(DeleteProductRequest.type, deleteProductSaga),
];
