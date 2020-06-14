import { useState } from 'react';
import { useAutoMemo, useAutoCallback, useAutoEffect } from 'hooks.macro';
import { Invoice, InvoiceProduct } from '../../api';
import { META_THUNK, ROUTES } from '../../app.constants';
import { useAuthConnect } from '../../store/auth';
import { useCustomersConnect } from '../../store/customers';
import { useInvoicesConnect } from '../../store/invoices/use-incoices-connect';
import { useNotificationsConnect } from '../../store/notifications/use-notifications-connect';
import { useProductsConnect } from '../../store/products';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import { transformEntityToList } from '../../services/helper-service';

export const useInvoiceFormLogic = (initialValues: Invoice) => {
  const { customerList, GetCustomerListRequest } = useCustomersConnect();
  const { UpdateAuthDataRequest } = useAuthConnect();
  const { showErrorNotification } = useNotificationsConnect();
  const { productList, GetProductListRequest } = useProductsConnect();
  const { UpdateInvoiceRequest } = useInvoicesConnect();
  const dispatch = useDispatch();
  const [products, setProducts] = useState<InvoiceProduct[]>(
    initialValues.products,
  );
  const onSubmit = useAutoCallback(async (payload: any) => {
    const payerId = payload?.payerId?.value;
    const addition = payload?.addition;
    const status = payload?.status?.value;
    const date = payload.date?.toISOString();

    if (
      [payerId, status, date].includes(null) ||
      [payerId, status, date].includes(undefined)
    ) {
      showErrorNotification('Не всі поля заповнені');
    } else {
      await UpdateInvoiceRequest(
        {
          id: initialValues.id,
          date,
          status,
          payerId,
          addition,
          products,
        },
        META_THUNK,
      );
      await UpdateAuthDataRequest({
        lastInvocieNumber: initialValues.id,
      });
      dispatch(push(ROUTES.admin + ROUTES.invoices));
    }
  });

  const customerSelectList = useAutoMemo(() =>
    transformEntityToList(customerList),
  );

  const productSelectList = useAutoMemo(() =>
    transformEntityToList(productList),
  );

  const appendProduct = useAutoCallback((product: InvoiceProduct) => {
    setProducts((state) => [...state, product]);
  });

  const removeProduct = useAutoCallback((index: number) => {
    setProducts((state) => state.filter((_, i) => i !== index));
  });

  useAutoEffect(() => {
    if (!customerList) {
      GetCustomerListRequest();
    }

    if (!productList) {
      GetProductListRequest();
    }
  });

  const loading = !customerList || !productList;

  return {
    onSubmit,
    customerSelectList,
    appendProduct,
    removeProduct,
    products,
    productSelectList,
    productList,
    loading,
  };
};
