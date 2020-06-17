import { Dictionary } from '@reduxjs/toolkit';
import { firebaseFirestore } from '../services/firebase-service';
import { AppDocument } from './api-documents.types';

export const updateDocument = ({ id, ...rest }: AppDocument) => {
  // todo update file
  // todo get file download link
  // todo save record
  firebaseFirestore.collection('documents').doc(id).set(rest, { merge: true });
};

export const getDocumentList = async () => {
  const documents: Dictionary<AppDocument> = {};
  const ref = await firebaseFirestore.collection('documents').get();

  ref.forEach((doc: any) => {
    documents[doc.id] = { ...doc.data(), id: doc.id };
  });

  return documents;
};

export const deleteDocument = (id: string) => {
  // todo delete file
  firebaseFirestore.collection('documents').doc(id).delete();
};
