import { createSlice, Dictionary, PayloadAction } from '@reduxjs/toolkit';
import { Invoice } from '../../api';
import { NetworkStatus, noopAction, prepareAction } from '../../store-utils';
import { InvoicesState } from './invoices.types';

export const InvoicesSlice = createSlice({
  name: 'invoices',
  initialState: {
    list: {
      data: null,
      networkStatus: NetworkStatus.None,
    },
  } as InvoicesState,
  reducers: {
    GetInvoiceListRequest: (state) => {
      state.list.networkStatus = NetworkStatus.Request;
    },
    GetInvoiceListSuccess: (
      state,
      action: PayloadAction<Dictionary<Invoice>>,
    ) => {
      state.list.networkStatus = NetworkStatus.Success;
      state.list.data = action.payload;
    },
    GetInvoiceListError: (state) => {
      state.list.networkStatus = NetworkStatus.Error;
    },
    UpdateInvoiceRequest: noopAction,
    UpdateInvoiceSuccess: {
      prepare: prepareAction,
      reducer: (state, action) => {
        state.list.data![action.payload.id] = action.payload as Invoice;
      },
    },
    UpdateInvoiceError: noopAction,
    DeleteInvoiceRequest: noopAction,
    DeleteInvoiceSuccess: {
      prepare: prepareAction,
      reducer: (state, action) => {
        delete state.list.data![action.payload as string];
      },
    },
    DeleteInvoiceError: noopAction,
  },
});
