import { firebaseFirestore } from '../services/firebase-service';
import { Dictionary } from '@reduxjs/toolkit';
import { Customer } from './api-customers.types';

export const updateCustomer = ({ id, ...rest }: Customer) =>
  firebaseFirestore.collection('customers').doc(id).set(rest, { merge: true });

export const getCustomerList = async () => {
  const customers: Dictionary<Customer> = {};
  const ref = await firebaseFirestore.collection('customers').get();

  ref.forEach((doc: any) => {
    customers[doc.id] = { ...doc.data(), id: doc.id };
  });

  return customers;
};

export const deleteCustomer = (id: string) =>
  firebaseFirestore.collection('customers').doc(id).delete();
