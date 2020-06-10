import { createSlice, Dictionary, PayloadAction } from '@reduxjs/toolkit';
import { Invoice } from '../../api';
import { NetworkStatus, noopAction } from '../../store-utils';
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
    UpdateInvoiceSuccess: noopAction,
    UpdateInvoiceError: noopAction,
    DeleteInvoiceRequest: noopAction,
    DeleteInvoiceSuccess: noopAction,
    DeleteInvoiceError: noopAction,
  },
});
