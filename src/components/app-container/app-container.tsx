import React, { memo } from 'react';

import { useAppContainerStyles } from './use-app-container-styles';
import Container from '@material-ui/core/Container';

type AppContainerProps = {
  containerClass?: string;
  children: any;
};

export const AppContainer = memo(
  ({ children, containerClass }: AppContainerProps) => {
    const classes = useAppContainerStyles();
    return (
      <section className={classes.container}>
        <Container maxWidth='lg' className={containerClass}>
          {children}
        </Container>
      </section>
    );
  },
);
