import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { noopAction, prepareAction } from '../../store-utils';
import { AuthData } from '../../api';

export const AuthSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null as any,
    authData: {},
  },
  reducers: {
    AuthRequest: noopAction,
    AuthError: noopAction,
    AuthSuccess: {
      reducer(state, action: PayloadAction<any, string, any, never>) {
        state.user = action.payload.user;
      },
      prepare: prepareAction,
    },
    GetAuthDataRequest: () => {},
    GetAuthDataSuccess: (state, action: PayloadAction<AuthData>) => {
      state.authData = action.payload;
    },
    GetAuthDataError: noopAction,
    UpdateAuthDataRequest: noopAction,
    UpdateAuthDataSuccess: (
      state,
      action: PayloadAction<Partial<AuthData>>,
    ) => {
      state.authData = { ...state.authData, ...action.payload };
    },
    UpdateAuthDataError: noopAction,
    SignOutRequest: noopAction,
    SignOutSuccess: {
      prepare: prepareAction,
      reducer: (state) => {
        state.user = null;
      },
    },
    SignOutError: noopAction,
  },
});
