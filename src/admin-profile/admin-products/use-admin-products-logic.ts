import { useState, useEffect, useCallback, useMemo } from 'react';
import { useProductsConnect } from '../../store/products/use-products-connect';
import { useModalConnect } from '../../store/modal';
import { UPDATE_PRODUCT_MODAL } from './admin-products.constants';
import { APP_CONFIRM } from '../../components/app-confirm';

export const useAdminProductsLogic = () => {
  const {
    GetProductListRequest,
    DeleteProductRequest,
    productList,
    networkStatus,
  } = useProductsConnect();
  const { ShowModal, HideModal } = useModalConnect();

  const [idToUpdate, setIdToUpdate] = useState(null);
  const [idToDelete, setIdToDelete] = useState(null);

  const products = useMemo(
    () =>
      productList
        ? Object.keys(productList).map((key) => productList[key])
        : [],
    [productList],
  );

  const onAddClick = useCallback(() => {
    setIdToUpdate(null);
    ShowModal(UPDATE_PRODUCT_MODAL);
    GetProductListRequest();
  }, [ShowModal, GetProductListRequest]);

  const onConfirmDelete = useCallback(() => {
    DeleteProductRequest(idToDelete);
    GetProductListRequest();
  }, [DeleteProductRequest, idToDelete, GetProductListRequest]);

  const onCancelDelete = useCallback(() => {
    setIdToDelete(null);
    HideModal(APP_CONFIRM);
  }, [HideModal]);

  useEffect(() => {
    if (!productList) {
      GetProductListRequest();
    }
  }, [GetProductListRequest, productList]);

  return {
    products,
    onAddClick,
    idToUpdate,
    networkStatus,
    onCancelDelete,
    onConfirmDelete,
  };
};
