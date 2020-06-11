import { createSlice, Dictionary, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../api';
import { NetworkStatus, noopAction, prepareAction } from '../../store-utils';
import { ProductsState } from './products.types';

export const ProductsSlice = createSlice({
  name: 'products',
  initialState: {
    list: {
      data: null,
      networkStatus: NetworkStatus.None,
    },
  } as ProductsState,
  reducers: {
    GetProductListRequest: (state) => {
      state.list.networkStatus = NetworkStatus.Request;
    },
    GetProductListSuccess: (
      state,
      action: PayloadAction<Dictionary<Product>>,
    ) => {
      state.list.networkStatus = NetworkStatus.Success;
      state.list.data = action.payload;
    },
    GetProductListError: (state) => {
      state.list.networkStatus = NetworkStatus.Error;
    },
    UpdateProductRequest: noopAction,
    UpdateProductSuccess: {
      prepare: prepareAction,
      reducer: (state, action) => {
        state.list.data![action.payload.id] = action.payload as Product;
      },
    },
    UpdateProductError: noopAction,
    DeleteProductRequest: noopAction,
    DeleteProductSuccess: {
      prepare: prepareAction,
      reducer: (state, action) => {
        delete state.list.data![action.payload as string];
      },
    },
    DeleteProductError: noopAction,
  },
});
