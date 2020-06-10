import { CustomersSlice } from './customers.slice';
import { CustomersState } from './customers.types';
import { createFeatureSelector } from '../../store-utils';
import { createSelector } from 'reselect';

export const selectCustomersFeature = createFeatureSelector<CustomersState>(
  CustomersSlice.name,
);

export const selectCustomerList = createSelector(
  selectCustomersFeature,
  ({ list: { data } }) => data,
);

export const selectCustomerListNetworkStatus = createSelector(
  selectCustomersFeature,
  ({ list: { networkStatus } }) => networkStatus,
);

export const constructCustomerByIdSelector = (id?: string | null) =>
  createSelector(selectCustomerList, (data) => (id && data ? data[id] : null));
