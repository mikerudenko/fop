import { useSelector } from 'react-redux';

import { AuthSlice } from './auth.slice';
import { selectCurrentUser } from './auth.selectors';
import { useActions } from '../../hooks';

export const useAuthConnect = () => {
  const user = useSelector(selectCurrentUser);

  return {
    ...useActions(AuthSlice.actions),
    user,
  };
};
