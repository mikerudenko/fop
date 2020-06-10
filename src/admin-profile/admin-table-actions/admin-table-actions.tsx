import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import React, { useCallback } from 'react';
import { AppRemoveButton } from '../../components/app-button';
import { useAdminTableActionsStyles } from './use-admin-table-actions-styles';

type AdminTableActionsProps = {
  onEditClick(id: string): void;
  onDeleteClick(id: string): void;
  id: string;
};

export const AdminTableActions = ({
  onEditClick,
  onDeleteClick,
  id,
}: AdminTableActionsProps) => {
  const classes = useAdminTableActionsStyles();

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
