import React, { memo } from 'react';
import IconButton from '@material-ui/core/IconButton';
import GetAppIcon from '@material-ui/icons/GetApp';

type AppDownloadButtonProps = {
  href: string;
};

export const AppDownloadButton = memo(({ href }: AppDownloadButtonProps) => {
  return (
    <a download href={href}>
      <IconButton aria-label='download'>
        <GetAppIcon fontSize='inherit' />
      </IconButton>
    </a>
  );
});
