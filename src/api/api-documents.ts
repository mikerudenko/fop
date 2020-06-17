import { Dictionary } from '@reduxjs/toolkit';
import {
  firebaseFirestore,
  firebaseStorage,
} from '../services/firebase-service';
import { AppDocument } from './api-documents.types';

export const updateDocument = async ({ id, file, name }: AppDocument) => {
  const dbRecord: any = { name };

  if (file instanceof File) {
    dbRecord.file = await uploadFileDocument(id, file);
  }

  firebaseFirestore
    .collection('documents')
    .doc(id)
    .set(dbRecord, { merge: true });

  return { id, ...dbRecord };
};

export const getDocumentList = async () => {
  const documents: Dictionary<AppDocument> = {};
  const ref = await firebaseFirestore.collection('documents').get();

  ref.forEach((doc: any) => {
    documents[doc.id] = { ...doc.data(), id: doc.id };
  });

  return documents;
};

export const deleteDocument = async (id: string) => {
  const ref = await firebaseFirestore.collection('documents').doc(id).get();
  const { file }: any = await ref.data();
  const refFile = firebaseStorage.refFromURL(file);
  await refFile.delete();
  return firebaseFirestore.collection('documents').doc(id).delete();
};

export const uploadFileDocument = async (id: string, file: File) => {
  const fileRef = firebaseStorage.ref().child(`documents/${id}/${file.name}`);
  await fileRef.put(file);
  return await fileRef.getDownloadURL();
};
