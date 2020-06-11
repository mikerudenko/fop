import firebase, { User } from 'firebase';
import get from 'lodash/get';
import { firebaseFirestore } from '../services/firebase-service';
import { CredentialsPayload, AuthData } from './api-auth.types';
import { firebaseAuth } from '../services/firebase-service';

export const signInWithCredentials = ({
  email,
  password,
}: CredentialsPayload) =>
  firebaseAuth.signInWithEmailAndPassword(email, password);

export const signOut = () => firebaseAuth.signOut();

export const getUserRole = async (user: User | null) => {
  let token;
  if (user) {
    token = await user.getIdTokenResult();
  } else {
    token = null;
  }

  return await get(token, 'claims.role', null);
};

export const getCurrentUser = () => firebase.auth().currentUser;

export const setLocalPersistence = () =>
  firebaseAuth.setPersistence(firebase.auth.Auth.Persistence.SESSION);

export const sendPasswordResetEmail = (email: string) =>
  firebaseAuth.sendPasswordResetEmail(email);

export const setLocale = (locale: string) =>
  (firebaseAuth.languageCode = locale);

export const getAuthData = async () => {
  const ref = await firebaseFirestore.collection('auth').doc('data').get();

  return ref.data();
};

export const updateAuthData = async (authData: Partial<AuthData>) =>
  firebaseFirestore
    .collection('auth')
    .doc('data')
    .set(authData, { merge: true });
