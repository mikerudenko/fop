import { useAutoCallback, useAutoEffect, useAutoMemo } from 'hooks.macro';
import React, { useState } from 'react';
import { META_THUNK } from '../../app.constants';
import { AppDownloadButton } from '../../components/app-button/app-download-button';
import { APP_CONFIRM } from '../../components/app-confirm';
import { useDocumentsConnect } from '../../store/documents';
import { useModalConnect } from '../../store/modal';
import { AdminTableActions } from '../admin-table-actions';
import { UPDATE_DOCUMENT_MODAL } from './admin-dcuments.constants';
import { AppDocument } from '../../api';

export const useAdminDocumentsLogic = () => {
  const {
    GetDocumentListRequest,
    DeleteDocumentRequest,
    documentList,
    networkStatus,
  } = useDocumentsConnect();
  const { ShowModal, HideModal } = useModalConnect();

  const [idToUpdate, setIdToUpdate] = useState<null | string>(null);
  const [idToDelete, setIdToDelete] = useState<null | string>(null);

  const documents = useAutoMemo(() =>
    documentList
      ? Object.keys(documentList).map((key) => documentList[key])
      : [],
  );

  const onAddClick = useAutoCallback(() => {
    setIdToUpdate(null);
    ShowModal(UPDATE_DOCUMENT_MODAL);
  });

  const ResetDelete = useAutoCallback(() => {
    setIdToDelete(null);
    HideModal(APP_CONFIRM);
  });

  const onConfirmDelete = useAutoCallback(async () => {
    await DeleteDocumentRequest(idToDelete, META_THUNK);
    ResetDelete();
  });

  const onEditClick = useAutoCallback((id: string) => {
    setIdToUpdate(id);
    ShowModal(UPDATE_DOCUMENT_MODAL);
  });

  const onDeleteClick = useAutoCallback((id: string) => {
    setIdToDelete(id);
    ShowModal(APP_CONFIRM);
  });

  const columns = useAutoMemo(() => [
    {
      dataField: 'name',
      label: 'Назва',
      formatter: (value: string) => value,
    },
    {
      dataField: 'id',
      label: '',
      formatter: (id: string, { file }: AppDocument) => (
        <AdminTableActions
          id={id}
          {...{ onEditClick, onDeleteClick }}
          additionalAction={<AppDownloadButton href={file as string} />}
        />
      ),
    },
  ]);

  useAutoEffect(() => {
    if (!documentList) {
      GetDocumentListRequest();
    }
  });

  return {
    documents,
    onAddClick,
    idToUpdate,
    networkStatus,
    onCancelDelete: ResetDelete,
    onConfirmDelete,
    columns,
  };
};
