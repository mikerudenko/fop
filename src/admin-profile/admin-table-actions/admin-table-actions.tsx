import React, { ReactNode } from 'react';
import { AppRemoveButton } from '../../components/app-button';
import { useAdminTableActionsStyles } from './use-admin-table-actions-styles';
import { useAutoCallback } from 'hooks.macro';
import { AppEditButton } from '../../components/app-button/app-edit-button';

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
      <AppEditButton onClick={onEditHandle} />
      <AppRemoveButton onClick={onDeleteHandle} />
    </div>
  );
};
