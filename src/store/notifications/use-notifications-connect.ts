import { useAutoMemo } from 'hooks.macro';
import { useSelector } from 'react-redux';
import { useActions } from '../../hooks';
import { selectNotifications } from './notifications.selectors';
import { NotificationsSlice } from './notifications.slice';
import {
  showErrorNotification,
  showInfoNotification,
  showSuccessNotification,
  showWarningNotification,
} from './notifications.utils';

const {
  EnqueueSnackbar,
  CloseSnackbar,
  RemoveSnackbar,
} = NotificationsSlice.actions;

export const useNotificationsConnect = () => {
  const notifications = useSelector(selectNotifications);
  const actions = useActions({
    closeSnackbar: CloseSnackbar,
    removeSnackbar: RemoveSnackbar,
    enqueueSnackbar: EnqueueSnackbar,
    showErrorNotification,
    showWarningNotification,
    showSuccessNotification,
    showInfoNotification,
  });

  return useAutoMemo(() => ({
    ...actions,
    notifications,
  }));
};
