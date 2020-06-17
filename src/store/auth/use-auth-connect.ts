import { useAutoMemo } from 'hooks.macro';
import { useSelector } from 'react-redux';
import { useActions } from '../../hooks';
import { selectAuthData, selectCurrentUser } from './auth.selectors';
import { AuthSlice } from './auth.slice';

export const useAuthConnect = () => {
  const user = useSelector(selectCurrentUser);
  const authData = useSelector(selectAuthData);

  const actions = useActions(AuthSlice.actions);

  return useAutoMemo(() => ({
    ...actions,
    authData,
    user,
  }));
};
