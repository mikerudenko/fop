import { useEffect, useCallback, useMemo } from 'react';
import { useCustomersConnect } from '../../store/customers';
import { Invoice } from '../../api';
import { useAuthConnect } from '../../store/auth';

export const useInvoiceFormLogic = () => {
  const { customerList, GetCustomerListRequest } = useCustomersConnect();

  const { authData, GetAuthDataRequest } = useAuthConnect();
  const onSubmit = useCallback((payload: Invoice) => {}, []);

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

  useEffect(() => {
    if (!customerList) {
      GetCustomerListRequest();
    }

    if (!authData) {
      GetAuthDataRequest();
    }
  }, [GetCustomerListRequest, customerList, GetAuthDataRequest, authData]);

  return {
    onSubmit,
    customerSelectList,
  };
};
