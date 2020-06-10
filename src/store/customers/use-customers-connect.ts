import { useSelector } from 'react-redux';
import { useMemo } from 'react';

import { CustomersSlice } from './customers.slice';
import {
  selectCustomerList,
  selectCustomerListNetworkStatus,
  constructCustomerByIdSelector,
} from './customers.selectors';
import { useActions } from '../../hooks';

export const useCustomersConnect = (id?: string | null) => {
  const networkStatus = useSelector(selectCustomerListNetworkStatus);
  const customerList = useSelector(selectCustomerList);
  const currentCustomerSelector = useMemo(
    () => constructCustomerByIdSelector(id),
    [id],
  );
  const currentCustomer = useSelector(currentCustomerSelector);

  const actions = useActions(CustomersSlice.actions);

  return useMemo(
    () => ({
      ...actions,
      customerList,
      networkStatus,
      currentCustomer,
    }),
    [actions, networkStatus, customerList, currentCustomer],
  );
};
