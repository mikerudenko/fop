import { useAutoCallback } from 'hooks.macro';
import { v4 as uuidv4 } from 'uuid';
import { AppDocument } from '../../../api';
import { META_THUNK } from '../../../app.constants';
import { useDocumentsConnect } from '../../../store/documents';
import { useModalConnect } from '../../../store/modal';
import { UPDATE_DOCUMENT_MODAL } from '../admin-dcuments.constants';

const getNewDocument = () => ({
  id: uuidv4(),
  name: '',
  file: '',
});

export const useUpdateDocumentModalLogic = (idToUpdate: null | string) => {
  const { UpdateDocumentRequest, currentDocument } = useDocumentsConnect(
    idToUpdate,
  );
  const { modalStatus, HideModal } = useModalConnect(UPDATE_DOCUMENT_MODAL);
  const title = idToUpdate ? 'Редагування документу' : 'Створення документу';
  const initialValues = idToUpdate
    ? (currentDocument as AppDocument)
    : getNewDocument();

  const onSubmit = useAutoCallback(async (payload: AppDocument) => {
    await UpdateDocumentRequest(payload, META_THUNK);
    HideModal(UPDATE_DOCUMENT_MODAL);
  });

  return {
    onSubmit,
    modalStatus,
    title,
    initialValues,
  } as const;
};
