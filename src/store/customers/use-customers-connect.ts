import { useAutoMemo } from 'hooks.macro';
import { useSelector } from 'react-redux';
import { useActions } from '../../hooks';
import {
  constructCustomerByIdSelector,
  selectCustomerList,
  selectCustomerListNetworkStatus,
} from './customers.selectors';
import { CustomersSlice } from './customers.slice';

export const useCustomersConnect = (id?: string | null) => {
  const networkStatus = useSelector(selectCustomerListNetworkStatus);
  const customerList = useSelector(selectCustomerList);
  const currentCustomerSelector = useAutoMemo(() =>
    constructCustomerByIdSelector(id),
  );
  const currentCustomer = useSelector(currentCustomerSelector);
  const actions = useActions(CustomersSlice.actions);

  return useAutoMemo(() => ({
    ...actions,
    customerList,
    networkStatus,
    currentCustomer,
  }));
};
