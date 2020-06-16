import React, { memo } from 'react';
import IconButton from '@material-ui/core/IconButton';
import PrintIcon from '@material-ui/icons/Print';
import { useAutoCallback } from 'hooks.macro';

type AppPrintButtonProps = {
  onClick(id: string): void;
  id: string;
};

export const AppPrintButton = memo(({ onClick, id }: AppPrintButtonProps) => {
  const onClickHandle = useAutoCallback(() => {
    onClick(id);
  });

  return (
    <IconButton aria-label='print' onClick={onClickHandle}>
      <PrintIcon fontSize='inherit' />
    </IconButton>
  );
});
