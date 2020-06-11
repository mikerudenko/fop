import { createSelector } from 'reselect';

import { AuthSlice } from './auth.slice';
import { createFeatureSelector } from '../../store-utils';
import { AuthState } from './auth.types';

export const selectAuthFeature = createFeatureSelector<AuthState>(
  AuthSlice.name,
);

export const selectCurrentUser = createSelector(
  selectAuthFeature,
  ({ user }) => user,
);

export const selectAuthData = createSelector(
  selectAuthFeature,
  ({ authData }) => authData,
);
