import { useAutoMemo } from 'hooks.macro';
import { useSelector } from 'react-redux';
import { useActions } from '../../hooks';
import { constructSelectModalStatus } from './modal.selectors';
import { ModalSlice } from './modal.slice';

export const useModalConnect = (id?: string) => {
  const modalStatus = useSelector(constructSelectModalStatus(id));
  const actions = useActions(ModalSlice.actions);

  return useAutoMemo(() => ({
    ...actions,
    modalStatus,
  }));
};
