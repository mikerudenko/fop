import React, { memo } from 'react';

import { useAppContainerStyles } from './use-app-container-styles';

type AppContainerProps = {
  children: any;
};

export const AppContainer = memo(({ children }: AppContainerProps) => {
  const classes = useAppContainerStyles();
  return <section className={classes.container}>{children}</section>;
});
