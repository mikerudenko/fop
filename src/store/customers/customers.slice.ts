import { createSlice, Dictionary, PayloadAction } from '@reduxjs/toolkit';
import {  Customer } from '../../api';
import { NetworkStatus, noopAction } from '../../store-utils';
import { CustomersState } from './customers.types';

export const CustomersSlice = createSlice({
  name: 'customers',
  initialState: {
    list: {
      data: null,
      networkStatus: NetworkStatus.None,
    },
  } as CustomersState,
  reducers: {
    GetCustomerListRequest: (state) => {
      state.list.networkStatus = NetworkStatus.Request;
    },
    GetCustomerListSuccess: (
      state,
      action: PayloadAction<Dictionary<Customer>>,
    ) => {
      state.list.networkStatus = NetworkStatus.Success;
      state.list.data = action.payload;
    },
    GetCustomerListError: (state) => {
      state.list.networkStatus = NetworkStatus.Error;
    },
    UpdateCustomerRequest: noopAction,
    UpdateCustomerSuccess: noopAction,
    UpdateCustomerError: noopAction,
    DeleteCustomerRequest: noopAction,
    DeleteCustomerSuccess: noopAction,
    DeleteCustomerError: noopAction,
  },
});
