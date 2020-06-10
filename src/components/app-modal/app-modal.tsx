import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import React, { FC, ReactNode, useCallback } from 'react';
import { useAppModalStyles } from './useAppModalStyles';
import { useModalConnect } from '../../store/modal';

export interface AppModalProps {
  id: string;
  title: ReactNode;
  content: ReactNode;
  modalStatus: boolean;
  maxWidth: 'md' | 'xs' | 'sm' | 'lg';
  onClose?(id: string): void;
  actions?(onClose: () => void): ReactNode;
  disableBackdropClick?: boolean;
}

export const AppModal: FC<AppModalProps> = ({
  title,
  id,
  actions,
  content,
  modalStatus,
  disableBackdropClick,
}) => {
  const classes = useAppModalStyles();
  const { HideModal } = useModalConnect(id);

  const onCloseModal = useCallback(() => {
    HideModal(id);
  }, [id, HideModal]);

  return (
    <Dialog
      {...{ disableBackdropClick }}
      open={modalStatus}
      onClose={onCloseModal}
      classes={{ paper: classes.paper }}
      aria-labelledby={`modal-dialog-${id}-title`}
      aria-describedby={`modal-dialog-${id}-description`}
    >
      <DialogTitle className={classes.header} disableTypography>
        {title}
        <IconButton
          aria-label='close'
          onClick={onCloseModal}
          className={classes.closeButton}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>{content}</DialogContent>
      {actions && <DialogActions>{actions(onCloseModal)}</DialogActions>}
    </Dialog>
  );
};
