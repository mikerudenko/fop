import { useCallback, useEffect, useMemo, useState } from 'react';
import { Invoice, InvoiceProduct } from '../../api';
import { META_THUNK, ROUTES } from '../../app.constants';
import { useAuthConnect } from '../../store/auth';
import { useCustomersConnect } from '../../store/customers';
import { useInvoicesConnect } from '../../store/invoices/use-incoices-connect';
import { useNotificationsConnect } from '../../store/notifications/use-notifications-connect';
import { useProductsConnect } from '../../store/products';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';

export const useInvoiceFormLogic = (initialValues: Invoice) => {
  const { customerList, GetCustomerListRequest } = useCustomersConnect();
  const {
    authData,
    GetAuthDataRequest,
    UpdateAuthDataRequest,
  } = useAuthConnect();
  const { showErrorNotification } = useNotificationsConnect();
  const { productList, GetProductListRequest } = useProductsConnect();
  const { UpdateInvoiceRequest } = useInvoicesConnect();
  const dispatch = useDispatch();
  const [products, setProducts] = useState<InvoiceProduct[]>(
    initialValues.products,
  );
  const onSubmit = useCallback(
    async (payload: any) => {
      const payerId = payload?.payerId?.value;
      const addition = payload?.addition;
      const status = payload?.status?.value;
      const date = payload.date?.toISOString();

      if (
        [payerId, status, date].includes(null) ||
        [payerId, status, date].includes(undefined) ||
        !authData
      ) {
        showErrorNotification('Не всі поля заповнені');
      } else {
        const lastInvocieNumber = authData.lastInvocieNumber + 1;

        await UpdateInvoiceRequest(
          {
            id: initialValues.id || String(lastInvocieNumber),
            date,
            status,
            payerId,
            addition,
            products,
          },
          META_THUNK,
        );
        await UpdateAuthDataRequest({
          lastInvocieNumber: lastInvocieNumber,
        });
        dispatch(push(ROUTES.admin + ROUTES.invoices));
      }
    },
    [
      dispatch,
      UpdateInvoiceRequest,
      products,
      showErrorNotification,
      UpdateAuthDataRequest,
      authData,
      initialValues.id,
    ],
  );

  const customerSelectList = useMemo(
    () =>
      customerList
        ? Object.keys(customerList).map((key) => ({
            value: customerList[key]!.id,
            label: customerList[key]!.name,
          }))
        : [],
    [customerList],
  );

  const productSelectList = useMemo(
    () =>
      productList
        ? Object.keys(productList).map((key) => ({
            value: productList[key]!.id,
            label: productList[key]!.name,
          }))
        : [],
    [productList],
  );

  const appendProduct = useCallback((product: InvoiceProduct) => {
    setProducts((state) => [...state, product]);
  }, []);

  const removeProduct = useCallback((index: number) => {
    setProducts((state) => state.filter((_, i) => i !== index));
  }, []);

  useEffect(() => {
    if (!customerList) {
      GetCustomerListRequest();
    }

    if (!authData) {
      GetAuthDataRequest();
    }

    if (!productList) {
      GetProductListRequest();
    }
  }, [
    GetCustomerListRequest,
    customerList,
    GetAuthDataRequest,
    authData,
    productList,
    GetProductListRequest,
  ]);

  const loading = !customerList || !authData || !productList;

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
