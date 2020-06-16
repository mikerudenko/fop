export interface CredentialsPayload {
  email: string;
  password: string;
}

export type AuthData = {
  bank: string;
  code: string;
  mfo: string;
  name: string;
  rr: string;
  lastInvocieNumber: number;
};
