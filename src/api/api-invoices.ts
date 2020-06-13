import { firebaseFirestore } from '../services/firebase-service';
import { Dictionary } from '@reduxjs/toolkit';
import { Invoice } from './api-invoices.types';

export const updateInvoice = ({ id, ...rest }: Invoice) =>
  firebaseFirestore
    .collection('invoices')
    .doc(id as string)
    .set(rest, { merge: true });

export const getInvoiceList = async () => {
  const invoices: Dictionary<Invoice> = {};
  const ref = await firebaseFirestore.collection('invoices').get();

  ref.forEach((doc: any) => {
    invoices[doc.id] = { ...doc.data(), id: doc.id };
  });

  return invoices;
};

export const deleteInvoice = (id: string) =>
  firebaseFirestore.collection('invoices').doc(id).delete();
