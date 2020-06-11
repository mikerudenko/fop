import { useSelector } from 'react-redux';

import { AuthSlice } from './auth.slice';
import { selectCurrentUser, selectAuthData } from './auth.selectors';
import { useActions } from '../../hooks';

export const useAuthConnect = () => {
  const user = useSelector(selectCurrentUser);
  const authData = useSelector(selectAuthData);

  return {
    ...useActions(AuthSlice.actions),
    authData,
    user,
  };
};
