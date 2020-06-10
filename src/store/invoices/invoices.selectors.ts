import { InvoicesSlice } from './invoices.slice';
import { InvoicesState } from './invoices.types';
import { createFeatureSelector } from '../../store-utils';
import { createSelector } from 'reselect';

export const selectInvoicesFeature = createFeatureSelector<InvoicesState>(
  InvoicesSlice.name,
);

export const selectInvoiceList = createSelector(
  selectInvoicesFeature,
  ({ list: { data } }) => data,
);

export const selectInvoiceListNetworkStatus = createSelector(
  selectInvoicesFeature,
  ({ list: { networkStatus } }) => networkStatus,
);

export const constructInvoiceByIdSelector = (id?: string | null) =>
  createSelector(selectInvoiceList, (data) => (id && data ? data[id] : null));
