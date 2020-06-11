import React, { memo } from 'react';
import { useAdminInvoicesStyles } from './use-admin-invoices-styles';
import { NetworkStatus } from '../../store-utils';
import { AppTable } from '../../components/app-table';
import Button from '@material-ui/core/Button';
import { useAdminInvoicesLogic } from './use-admin-invoices-logic';
import { AppConfirm } from '../../components/app-confirm';

export const AdminInvoices = memo(() => {
  const classes = useAdminInvoicesStyles();
  const {
    invoices,
    networkStatus,
    onCancelDelete,
    onConfirmDelete,
    onAddClick,
    columns,
  } = useAdminInvoicesLogic();

  return (
    <div className={classes.container}>
      <div className={classes.controls}>
        <Button color='primary' variant='contained' onClick={onAddClick}>
          Створити рахунок
        </Button>
      </div>
      <AppTable
        {...{
          columns,
          keyField: 'id',
          data: invoices,
          loading: networkStatus === NetworkStatus.Request,
        }}
      />
      <AppConfirm
        content='Ви дійсно бажаєте видалити даний рахунок?'
        title='Увага! Видалення'
        onConfirmClick={onConfirmDelete}
        onCancelClick={onCancelDelete}
        loading={false}
      />
    </div>
  );
});
