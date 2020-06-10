import React, { memo, useEffect } from 'react';
import { useProductsConnect } from '../../store/products/use-products-connect';

export const AdminProducts = memo(() => {
  const { GetProductListRequest, productList } = useProductsConnect();

  useEffect(() => {
    if (!Object.keys(productList).length) {
      GetProductListRequest();
    }
  }, [GetProductListRequest, productList]);

  const columns = [];

  return <div>products</div>;
});
