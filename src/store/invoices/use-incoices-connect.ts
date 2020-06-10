import { useSelector } from 'react-redux';
import { useMemo } from 'react';

import { InvoicesSlice } from './invoices.slice';
import {
  selectInvoiceList,
  selectInvoiceListNetworkStatus,
  constructInvoiceByIdSelector,
} from './invoices.selectors';
import { useActions } from '../../hooks';

export const useInvoicesConnect = (id?: string | null) => {
  const networkStatus = useSelector(selectInvoiceListNetworkStatus);
  const invoiceList = useSelector(selectInvoiceList);
  const currentInvoiceSelector = useMemo(
    () => constructInvoiceByIdSelector(id),
    [id],
  );
  const currentInvoice = useSelector(currentInvoiceSelector);

  const actions = useActions(InvoicesSlice.actions);

  return useMemo(
    () => ({
      ...actions,
      invoiceList,
      networkStatus,
      currentInvoice,
    }),
    [actions, networkStatus, invoiceList, currentInvoice],
  );
};
