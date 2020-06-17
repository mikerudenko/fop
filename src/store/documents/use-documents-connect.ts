import { useAutoMemo } from 'hooks.macro';
import { useSelector } from 'react-redux';
import { useActions } from '../../hooks';
import {
  constructDocumentByIdSelector,
  selectDocumentList,
  selectDocumentListNetworkStatus,
} from './documents.selectors';
import { DocumentsSlice } from './documents.slice';

export const useDocumentsConnect = (id?: string | null) => {
  const networkStatus = useSelector(selectDocumentListNetworkStatus);
  const documentList = useSelector(selectDocumentList);
  const currentDocumentSelector = useAutoMemo(() =>
    constructDocumentByIdSelector(id),
  );
  const currentDocument = useSelector(currentDocumentSelector);
  const actions = useActions(DocumentsSlice.actions);

  return useAutoMemo(() => ({
    ...actions,
    documentList,
    networkStatus,
    currentDocument,
  }));
};
