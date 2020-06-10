import { RouterState } from 'connected-react-router';

import { NotificationsState } from './notifications';
import { AuthState } from './auth';
import { ModalState } from './modal';

export interface BookLakeState {
  router: RouterState;
  notifications: NotificationsState;
  auth: AuthState;
  modal: ModalState;
}
