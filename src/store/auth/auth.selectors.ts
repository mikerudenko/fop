import { createSelector } from 'reselect';

import { AuthSlice } from './auth.slice';
import { createFeatureSelector } from '../../store-utils';

export const selectAuthFeature = createFeatureSelector<any>(AuthSlice.name);

export const selectCurrentUser = createSelector(
  selectAuthFeature,
  ({ user }) => user,
);
