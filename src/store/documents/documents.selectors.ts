import { DocumentsSlice } from './documents.slice';
import { DocumentsState } from './documents.types';
import { createFeatureSelector } from '../../store-utils';
import { createSelector } from 'reselect';

export const selectDocumentsFeature = createFeatureSelector<DocumentsState>(
  DocumentsSlice.name,
);

export const selectDocumentList = createSelector(
  selectDocumentsFeature,
  ({ list: { data } }) => data,
);

export const selectDocumentListNetworkStatus = createSelector(
  selectDocumentsFeature,
  ({ list: { networkStatus } }) => networkStatus,
);

export const constructDocumentByIdSelector = (id?: string | null) =>
  createSelector(selectDocumentList, (data) => (id && data ? data[id] : null));
