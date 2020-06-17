import { useAutoMemo } from 'hooks.macro';
import { useSelector } from 'react-redux';
import { useActions } from '../../hooks';
import {
  constructProductByIdSelector,
  selectProductList,
  selectProductListNetworkStatus,
} from './products.selectors';
import { ProductsSlice } from './products.slice';

export const useProductsConnect = (id?: string | null) => {
  const networkStatus = useSelector(selectProductListNetworkStatus);
  const productList = useSelector(selectProductList);
  const currentProductSelector = useAutoMemo(() =>
    constructProductByIdSelector(id),
  );
  const currentProduct = useSelector(currentProductSelector);
  const actions = useActions(ProductsSlice.actions);

  return useAutoMemo(() => ({
    ...actions,
    productList,
    networkStatus,
    currentProduct,
  }));
};
