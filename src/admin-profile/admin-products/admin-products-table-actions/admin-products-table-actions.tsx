import React, { useCallback } from 'react';
import { useAdminProductsTableActionsStyles } from './use-admin-products-table-actions-styles';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import { AppRemoveButton } from '../../../components/app-button';

type AdminProductsTableActionsProps = {
  onEditClick(id: string): void;
  onDeleteClick(id: string): void;
  id: string;
};

export const AdminProductsTableActions = ({
  onEditClick,
  onDeleteClick,
  id,
}: AdminProductsTableActionsProps) => {
  const classes = useAdminProductsTableActionsStyles();

  const onDeleteHandle = useCallback(() => onDeleteClick(id), [
    id,
    onDeleteClick,
  ]);
  const onEditHandle = useCallback(() => onEditClick(id), [id, onEditClick]);

  return (
    <div className={classes.actions}>
      <IconButton aria-label='edit' onClick={onEditHandle}>
        <EditIcon fontSize='inherit' />
      </IconButton>
      <AppRemoveButton onClick={onDeleteHandle} />
    </div>
  );
};
