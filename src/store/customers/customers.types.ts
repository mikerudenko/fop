import { WithNetworkStatus } from '../../store-utils';
import { Dictionary } from '@reduxjs/toolkit';
import { Customer } from '../../api';

export type CustomersState = {
  list: WithNetworkStatus<Dictionary<Customer> | null>;
};
