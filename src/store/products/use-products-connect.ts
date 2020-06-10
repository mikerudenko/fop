import { useSelector } from 'react-redux';
import { useMemo } from 'react';

import { ProductsSlice } from './products.slice';
import {
  selectProductList,
  selectProductListNetworkStatus,
  constructProductByIdSelector,
} from './products.selectors';
import { useActions } from '../../hooks';

export const useProductsConnect = (id?: string | null) => {
  const networkStatus = useSelector(selectProductListNetworkStatus);
  const productList = useSelector(selectProductList);
  const currentProductSelector = useMemo(
    () => constructProductByIdSelector(id),
    [id],
  );
  const currentProduct = useSelector(currentProductSelector);

  const actions = useActions(ProductsSlice.actions);

  return useMemo(
    () => ({
      ...actions,
      productList,
      networkStatus,
      currentProduct,
    }),
    [actions, networkStatus, productList, currentProduct],
  );
};
