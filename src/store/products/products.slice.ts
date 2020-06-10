import { createSlice, Dictionary, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../api';
import { NetworkStatus, noopAction } from '../../store-utils';
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
    UpdateProductSuccess: noopAction,
    UpdateProductError: noopAction,
    DeleteProductRequest: noopAction,
    DeleteProductSuccess: noopAction,
    DeleteProductError: noopAction,
  },
});
