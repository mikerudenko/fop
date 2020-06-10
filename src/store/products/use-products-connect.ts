import { useSelector } from 'react-redux';
import { useMemo } from 'react';

import { ProductsSlice } from './products.slice';
import {
  selectProductList,
  selectProductListNetworkStatus,
} from './products.selectors';
import { useActions } from '../../hooks';

export const useProductsConnect = () => {
  const networkStatus = useSelector(selectProductListNetworkStatus);
  const productList = useSelector(selectProductList);

  const actions = useActions(ProductsSlice.actions);

  return useMemo(
    () => ({
      ...actions,
      productList,
      networkStatus,
    }),
    [actions, networkStatus, productList],
  );
};
