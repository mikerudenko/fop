import React, { memo } from 'react';
import { useAdminProductsStyles } from './use-admin-products-styles';
import { NetworkStatus } from '../../store-utils';
import { AppTable } from '../../components/app-table';
import Button from '@material-ui/core/Button';
import { useAdminProductsLogic } from './use-admin-products-logic';
import { UpdateProductModal } from './update-product-modal';
import { AppConfirm } from '../../components/app-confirm';

export const AdminProducts = memo(() => {
  const classes = useAdminProductsStyles();
  const {
    onAddClick,
    products,
    networkStatus,
    idToUpdate,
    onCancelDelete,
    onConfirmDelete,
    columns,
  } = useAdminProductsLogic();

  return (
    <div className={classes.container}>
      <div className={classes.controls}>
        <Button onClick={onAddClick} color='primary' variant='contained'>
          Додати продукт
        </Button>
      </div>
      <AppTable
        {...{
          columns,
          keyField: 'id',
          data: products,
          loading: networkStatus === NetworkStatus.Request,
        }}
      />
      <UpdateProductModal idToUpdate={idToUpdate} />
      <AppConfirm
        content='Ви дійсно бажаєте видалити даний продукт?'
        title='Увага! Видалення'
        onConfirmClick={onConfirmDelete}
        onCancelClick={onCancelDelete}
        loading={false}
      />
    </div>
  );
});
