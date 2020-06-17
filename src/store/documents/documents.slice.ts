import { createSlice, Dictionary, PayloadAction } from '@reduxjs/toolkit';
import { NetworkStatus, noopAction, prepareAction } from '../../store-utils';
import { DocumentsState } from './documents.types';
import { AppDocument } from '../../api';

export const DocumentsSlice = createSlice({
  name: '@documents',
  initialState: {
    list: {
      data: null,
      networkStatus: NetworkStatus.None,
    },
  } as DocumentsState,
  reducers: {
    GetDocumentListRequest: (state) => {
      state.list.networkStatus = NetworkStatus.Request;
    },
    GetDocumentListSuccess: (
      state,
      action: PayloadAction<Dictionary<AppDocument>>,
    ) => {
      state.list.networkStatus = NetworkStatus.Success;
      state.list.data = action.payload;
    },
    GetDocumentListError: (state) => {
      state.list.networkStatus = NetworkStatus.Error;
    },
    UpdateDocumentRequest: noopAction,
    UpdateDocumentSuccess: {
      prepare: prepareAction,
      reducer: (state, action) => {
        state.list.data![action.payload.id] = action.payload as AppDocument;
      },
    },
    UpdateDocumentError: noopAction,
    DeleteDocumentRequest: noopAction,
    DeleteDocumentSuccess: {
      prepare: prepareAction,
      reducer: (state, action) => {
        delete state.list.data![action.payload as string];
      },
    },
    DeleteDocumentError: noopAction,
  },
});
