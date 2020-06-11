import { AuthData } from '../../api';

export type AuthState = {
  user: any;
  authData: AuthData | null;
};
