import React, { memo, ReactNode, useCallback, useMemo } from 'react';
import { AppModal } from '../app-modal';
import { APP_CONFIRM } from './app-confirm.constants';
import Button from '@material-ui/core/Button';
import { useModalConnect } from '../../store/modal';
import { useAppConfirmStyles } from './use-app-confirm-styles';

export type AppConfirmProps = {
  content: ReactNode;
  title: ReactNode;
  onConfirmClick: () => void;
  onCancelClick: () => void;
  loading: boolean;
};

export const AppConfirm = memo(
  ({
    content,
    title,
    onCancelClick,
    onConfirmClick,
    loading,
  }: AppConfirmProps) => {
    const { HideModal, modalStatus } = useModalConnect(APP_CONFIRM);
    const classes = useAppConfirmStyles();

    const onCancelHandle = useCallback(() => {
      onCancelClick();
      HideModal(APP_CONFIRM);
    }, [HideModal, onCancelClick]);

    const onConfirm = useCallback(() => {
      onConfirmClick();
    }, [onConfirmClick]);

    const modalContent = useMemo(
      () => (
        <>
          {content}
          <div className={classes.buttons}>
            <Button
              variant='text'
              color='primary'
              onClick={onCancelHandle}
              id='test-cancel-button'
            >
              Відміна
            </Button>
            <Button
              color='secondary'
              onClick={onConfirm}
              variant='contained'
              id='test-cancel-button'
            >
              OK
            </Button>
          </div>
        </>
      ),
      [content, onCancelHandle, onConfirm, classes.buttons],
    );

    return (
      <AppModal
        {...{
          onClose: onCancelHandle,
          modalStatus,
        }}
        disableBackdropClick
        maxWidth='lg'
        id={APP_CONFIRM}
        title={title}
        content={modalContent}
      />
    );
  },
);
