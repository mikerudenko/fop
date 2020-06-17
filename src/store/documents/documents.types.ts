import { WithNetworkStatus } from '../../store-utils';
import { Dictionary } from '@reduxjs/toolkit';
import { AppDocument } from '../../api';

export type DocumentsState = {
  list: WithNetworkStatus<Dictionary<AppDocument> | null>;
};
