import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import { combineReducers } from 'redux';

import { NotificationsSlice } from './notifications';
import { AuthSlice } from './auth';
import { ModalSlice } from './modal';
import { ProductsSlice } from './products';

export const createRootReducer = (history: History) =>
  combineReducers({
    router: connectRouter(history) as any,
    [NotificationsSlice.name]: NotificationsSlice.reducer,
    [AuthSlice.name]: AuthSlice.reducer,
    [ModalSlice.name]: ModalSlice.reducer,
    [ProductsSlice.name]: ProductsSlice.reducer,
  });
