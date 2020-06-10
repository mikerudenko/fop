import React, { memo } from 'react';
import DocumentTitle from 'react-document-title';

import { AppContainer } from '../components/app-container';
import StatusImage from './assets/404.svg';
import FishingRod from './assets/fishing-rod.svg';
import { useNotFoundStyles } from './use-not-found-styles';

export const NotFound = memo(() => {
  const classes = useNotFoundStyles();
  return (
    <DocumentTitle title='Сторінка не знайдена'>
      <AppContainer containerClass={classes.container}>
        <h2 className={classes.title}>Сторінка не знайдена</h2>
        <div className={classes.imageContainer}>
          <img src={StatusImage} alt='404' className={classes.status} />
          <img
            src={FishingRod}
            alt='Page in not found'
            className={classes.fishingRod}
          />
        </div>
      </AppContainer>
    </DocumentTitle>
  );
});
