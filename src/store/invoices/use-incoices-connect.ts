import { useAutoMemo } from 'hooks.macro';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useActions } from '../../hooks';
import {
  constructInvoiceByIdSelector,
  selectInvoiceList,
  selectInvoiceListNetworkStatus,
} from './invoices.selectors';
import { InvoicesSlice } from './invoices.slice';

export const useInvoicesConnect = (id?: string | null) => {
  const networkStatus = useSelector(selectInvoiceListNetworkStatus);
  const invoiceList = useSelector(selectInvoiceList);
  const currentInvoiceSelector = useMemo(
    () => constructInvoiceByIdSelector(id),
    [id],
  );
  const currentInvoice = useSelector(currentInvoiceSelector);
  const actions = useActions(InvoicesSlice.actions);

  return useAutoMemo(() => ({
    ...actions,
    invoiceList,
    networkStatus,
    currentInvoice,
  }));
};
