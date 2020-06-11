import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useProductsConnect } from '../../store/products';
import { useModalConnect } from '../../store/modal';
import { UPDATE_PRODUCT_MODAL } from './admin-products.constants';
import { APP_CONFIRM } from '../../components/app-confirm';
import { META_THUNK } from '../../app.constants';
import { AdminTableActions } from '../admin-table-actions';

export const useAdminProductsLogic = () => {
  const {
    GetProductListRequest,
    DeleteProductRequest,
    productList,
    networkStatus,
  } = useProductsConnect();
  const { ShowModal, HideModal } = useModalConnect();

  const [idToUpdate, setIdToUpdate] = useState<null | string>(null);
  const [idToDelete, setIdToDelete] = useState<null | string>(null);

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
  }, [ShowModal]);

  const ResetDelete = useCallback(() => {
    setIdToDelete(null);
    HideModal(APP_CONFIRM);
  }, [HideModal]);

  const onConfirmDelete = useCallback(async () => {
    await DeleteProductRequest(idToDelete, META_THUNK);
    ResetDelete();
  }, [DeleteProductRequest, idToDelete, ResetDelete]);

  const onEditClick = useCallback(
    (id: string) => {
      setIdToUpdate(id);
      ShowModal(UPDATE_PRODUCT_MODAL);
    },
    [ShowModal],
  );

  const onDeleteClick = useCallback(
    (id: string) => {
      setIdToDelete(id);
      ShowModal(APP_CONFIRM);
    },
    [ShowModal],
  );

  const columns = useMemo(
    () => [
      {
        dataField: 'code',
        label: 'Код',
        formatter: (value: string) => value,
      },
      {
        dataField: 'name',
        label: 'Найменування',
        formatter: (value: string) => value,
      },
      {
        dataField: 'price',
        label: 'Ціна',
        formatter: (value: string) => value,
      },
      {
        dataField: 'id',
        label: '',
        formatter: (value: string) => (
          <AdminTableActions id={value} {...{ onEditClick, onDeleteClick }} />
        ),
      },
    ],
    [onDeleteClick, onEditClick],
  );

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
    onCancelDelete: ResetDelete,
    onConfirmDelete,
    columns,
  };
};
