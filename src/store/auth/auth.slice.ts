import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { noopAction, prepareAction } from '../../store-utils';
import { MetaThunk } from '../../app.types';

export const AuthSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null as any,
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

    SignOutRequest: noopAction,
    SignOutSuccess: {
      prepare: prepareAction,
      reducer: (state, action: PayloadAction<null, string, MetaThunk>) => {
        state.user = null;
      },
    },
    SignOutError: noopAction,
  },
});
