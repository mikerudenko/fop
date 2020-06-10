import { useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Product } from '../../../api';
import { useProductsConnect } from '../../../store/products/use-products-connect';
import { META_THUNK } from '../../../app.constants';
import { useModalConnect } from '../../../store/modal';
import { UPDATE_PRODUCT_MODAL } from '../admin-products.constants';

const getNewProduct = () => ({
  id: uuidv4(),
  name: '',
  code: '',
  price: '',
});

export const useUpdateProductModalLogic = (idToUpdate: null | string) => {
  const {
    UpdateProductRequest,
    currentProduct,
    GetProductListRequest,
  } = useProductsConnect(idToUpdate);
  const { modalStatus, HideModal } = useModalConnect(UPDATE_PRODUCT_MODAL);
  const title = idToUpdate ? 'Редагування продукту' : 'Створення продукту';
  const initialValues = idToUpdate ? currentProduct : getNewProduct();

  const onSubmit = useCallback(
    async (payload: Product, e) => {
      await UpdateProductRequest(
        { ...payload, price: Number(payload.price) },
        META_THUNK,
      );
      HideModal(UPDATE_PRODUCT_MODAL);
      GetProductListRequest();
    },
    [UpdateProductRequest, GetProductListRequest, HideModal],
  );

  return {
    onSubmit,
    modalStatus,
    title,
    initialValues,
  };
};
