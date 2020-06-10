import React, { memo } from 'react';
import { useAdminCustomersStyles } from './use-admin-customers-styles';
import { NetworkStatus } from '../../store-utils';
import { AppTable } from '../../components/app-table';
import Button from '@material-ui/core/Button';
import { useAdminCustomersLogic } from './use-admin-customers-logic';
import { UpdateCustomerModal } from './update-customer-modal';
import { AppConfirm } from '../../components/app-confirm';

export const AdminCustomers = memo(() => {
  const classes = useAdminCustomersStyles();
  const {
    onAddClick,
    customers,
    networkStatus,
    idToUpdate,
    onCancelDelete,
    onConfirmDelete,
    columns,
  } = useAdminCustomersLogic();

  return (
    <div className={classes.container}>
      <div className={classes.controls}>
        <Button onClick={onAddClick} color='primary' variant='contained'>
          Додати споживача
        </Button>
      </div>
      <AppTable
        {...{
          columns,
          keyField: 'id',
          data: customers,
          loading: networkStatus === NetworkStatus.Request,
        }}
      />
      <UpdateCustomerModal idToUpdate={idToUpdate} />
      <AppConfirm
        content='Ви дійсно бажаєте видалити даного споживача?'
        title='Увага! Видалення'
        onConfirmClick={onConfirmDelete}
        onCancelClick={onCancelDelete}
        loading={false}
      />
    </div>
  );
});
