import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import React, { ReactNode } from 'react';
import { AppRemoveButton } from '../../components/app-button';
import { useAdminTableActionsStyles } from './use-admin-table-actions-styles';
import { useAutoCallback } from 'hooks.macro';

type AdminTableActionsProps = {
  onEditClick(id: string): void;
  onDeleteClick(id: string): void;
  additionalAction?: ReactNode;
  id: string;
};

export const AdminTableActions = ({
  onEditClick,
  onDeleteClick,
  id,
  additionalAction,
}: AdminTableActionsProps) => {
  const classes = useAdminTableActionsStyles();

  const onDeleteHandle = useAutoCallback(() => onDeleteClick(id));
  const onEditHandle = useAutoCallback(() => onEditClick(id));

  return (
    <div className={classes.actions}>
      {additionalAction}
      <IconButton aria-label='edit' onClick={onEditHandle}>
        <EditIcon fontSize='inherit' />
      </IconButton>
      <AppRemoveButton onClick={onDeleteHandle} />
    </div>
  );
};
