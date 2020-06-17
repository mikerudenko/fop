import { useAutoCallback, useAutoEffect } from 'hooks.macro';
import noop from 'lodash/noop';
import { useSnackbar } from 'notistack';
import { SyntheticEvent, useRef } from 'react';
import { useNotificationsConnect } from './use-notifications-connect';

export const useNotificationsLogic = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { notifications, removeSnackbar } = useNotificationsConnect();
  const displayedRef = useRef<string[]>([]);

  const storeDisplayed = useAutoCallback((id) => {
    displayedRef.current = [...displayedRef.current, id];
  });

  const removeDisplayed = useAutoCallback((id) => {
    displayedRef.current = displayedRef.current.filter((key) => id !== key);
  });

  const onExited = useAutoCallback((event: SyntheticEvent, key: string) => {
    removeSnackbar(key);
    removeDisplayed(key);
  });

  useAutoEffect(() => {
    notifications.forEach(
      ({ key, message, options = {}, dismissed = false }: any) => {
        if (dismissed) {
          closeSnackbar(key);
          return;
        }

        if (displayedRef.current.includes(key)) {
          return;
        }

        enqueueSnackbar(message, {
          key,
          ...options,
          vertical: 'top',
          horizontal: 'right',
          // @ts-ignore
          onClose: options.onClose || noop,
          onExited,
        } as any);
        storeDisplayed(key);
      },
    );
  });
};
