import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import {
  showErrorNotification,
  showSuccessNotification,
} from '../notifications';
import { ProductsSlice } from './products.slice';
import { MetaThunk } from '../../app.types';
import {
  getProductList,
  Product,
  updateProduct,
  deleteProduct,
} from '../../api';

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

export function* updateProductSaga(
  action: PayloadAction<Product, string, MetaThunk>,
) {
  try {
    yield call(updateProduct, action.payload);
    yield put(UpdateProductSuccess(action.payload, action.meta));
    yield put(showSuccessNotification('Товар успішно відредагований'));
  } catch (e) {
    yield put(
      showErrorNotification('Помилка при редагуванні товару, спробуйте ще раз'),
    );
    yield put(UpdateProductError(null, action.meta, true));
  }
}

export function* deleteProductSaga(
  action: PayloadAction<string, string, MetaThunk>,
) {
  try {
    yield call(deleteProduct, action.payload);
    yield put(DeleteProductSuccess(action.payload, action.meta));
    yield put(showSuccessNotification('Товар успішно видалено'));
  } catch {
    yield put(showErrorNotification('Помилка при видаленні, спробуйте ще раз'));
    yield put(DeleteProductError(null, action.meta, true));
  }
}

export const ProductSagas = [
  takeLatest(GetProductListRequest.type, getProductListSaga),
  takeEvery(UpdateProductRequest.type, updateProductSaga),
  takeEvery(DeleteProductRequest.type, deleteProductSaga),
];
