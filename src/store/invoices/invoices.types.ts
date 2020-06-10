import { WithNetworkStatus } from '../../store-utils';
import { Dictionary } from '@reduxjs/toolkit';
import { Invoice } from '../../api';

export type InvoicesState = {
  list: WithNetworkStatus<Dictionary<Invoice> | null>;
};
