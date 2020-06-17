import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import {
  showErrorNotification,
  showSuccessNotification,
} from '../notifications';
import { DocumentsSlice } from './documents.slice';
import { MetaThunk } from '../../app.types';
import {
  getDocumentList,
  updateDocument,
  deleteDocument,
  AppDocument,
} from '../../api';

const {
  GetDocumentListRequest,
  GetDocumentListSuccess,
  GetDocumentListError,
  UpdateDocumentRequest,
  UpdateDocumentSuccess,
  UpdateDocumentError,
  DeleteDocumentRequest,
  DeleteDocumentSuccess,
  DeleteDocumentError,
} = DocumentsSlice.actions;

export function* getDocumentListSaga() {
  try {
    const documents = yield call(getDocumentList);
    yield put(GetDocumentListSuccess(documents));
  } catch (error) {
    yield put(showErrorNotification('Помилка при отриманні списку документів'));
    yield put(GetDocumentListError());
  }
}

export function* updateDocumentSaga(
  action: PayloadAction<AppDocument, string, MetaThunk>,
) {
  try {
    yield call(updateDocument, action.payload);
    yield put(UpdateDocumentSuccess(action.payload, action.meta));
    yield put(showSuccessNotification('Документ успішно відредагований'));
  } catch {
    yield put(
      showErrorNotification(
        'Помилка при редагуванні документа, спробуйте ще раз',
      ),
    );
    yield put(UpdateDocumentError(null, action.meta, true));
  }
}

export function* deleteDocumentSaga(
  action: PayloadAction<string, string, MetaThunk>,
) {
  try {
    yield call(deleteDocument, action.payload);
    yield put(DeleteDocumentSuccess(action.payload, action.meta));
    yield put(showSuccessNotification('Документ успішно видалено'));
  } catch {
    yield put(
      showErrorNotification(
        'Помилка при видаленні документу, спробуйте ще раз',
      ),
    );
    yield put(DeleteDocumentError(null, action.meta, true));
  }
}

export const DocumentSagas = [
  takeLatest(GetDocumentListRequest.type, getDocumentListSaga),
  takeEvery(UpdateDocumentRequest.type, updateDocumentSaga),
  takeEvery(DeleteDocumentRequest.type, deleteDocumentSaga),
];
