import React, { memo } from 'react';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';

type AppEditButtonProps = {
  onClick(): void;
};

export const AppEditButton = memo(({ onClick }: AppEditButtonProps) => {
  return (
    <IconButton aria-label='edit' onClick={onClick}>
      <EditIcon fontSize='inherit' />
    </IconButton>
  );
});
