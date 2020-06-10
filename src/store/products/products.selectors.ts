import { ProductsSlice } from './products.slice';
import { ProductsState } from './products.types';
import { createFeatureSelector } from '../../store-utils';
import { createSelector } from 'reselect';

export const selectProductsFeature = createFeatureSelector<ProductsState>(
  ProductsSlice.name,
);

export const selectProductList = createSelector(
  selectProductsFeature,
  ({ list: { data } }) => data,
);

export const selectProductListNetworkStatus = createSelector(
  selectProductsFeature,
  ({ list: { networkStatus } }) => networkStatus,
);
