import { useCallback } from 'react';

import { useAuthConnect } from '../store/auth/use-auth-connect';
import { SignInValues, resolveServerError } from './sign-in.validation';
import { META_THUNK } from '../app.constants';
import { useForm } from 'react-hook-form';

export const useSignInLogic = () => {
  const { AuthRequest, GetAuthDataRequest } = useAuthConnect();
  const { setError } = useForm();

  const onSubmit = useCallback(
    async (payload: SignInValues, e) => {
      try {
        await AuthRequest(payload, {
          ...META_THUNK,
          strategy: 'sign-in',
        } as any);
        GetAuthDataRequest();
      } catch (error) {
        setError(resolveServerError(error));
      }
    },
    [AuthRequest, setError, GetAuthDataRequest],
  );

  return {
    onSubmit,
  };
};
