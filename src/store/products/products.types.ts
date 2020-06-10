import { WithNetworkStatus } from '../../store-utils';
import { Dictionary } from '@reduxjs/toolkit';
import { Product } from '../../api';

export type ProductsState = {
  list: WithNetworkStatus<Dictionary<Product> | null>;
};
