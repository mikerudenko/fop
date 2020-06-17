import React, { memo } from 'react';
import { useAdminDocumentsStyles } from './use-admin-documents-styles';
import { NetworkStatus } from '../../store-utils';
import { AppTable } from '../../components/app-table';
import Button from '@material-ui/core/Button';
import { useAdminDocumentsLogic } from './use-admin-documents-logic';
import { UpdateDocumentModal } from './update-document-modal';
import { AppConfirm } from '../../components/app-confirm';

export const AdminDocuments = memo(() => {
  const classes = useAdminDocumentsStyles();
  const {
    onAddClick,
    documents,
    networkStatus,
    idToUpdate,
    onCancelDelete,
    onConfirmDelete,
    columns,
  } = useAdminDocumentsLogic();

  return (
    <div className={classes.container}>
      <div className={classes.controls}>
        <Button onClick={onAddClick} color='primary' variant='contained'>
          Додати документ
        </Button>
      </div>
      <AppTable
        {...{
          columns,
          keyField: 'id',
          data: documents,
          loading: networkStatus === NetworkStatus.Request,
        }}
      />
      <UpdateDocumentModal idToUpdate={idToUpdate} />
      <AppConfirm
        content='Ви дійсно бажаєте видалити даний документ?'
        title='Увага! Видалення'
        onConfirmClick={onConfirmDelete}
        onCancelClick={onCancelDelete}
        loading={false}
      />
    </div>
  );
});
