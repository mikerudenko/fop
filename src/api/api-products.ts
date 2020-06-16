import { firebaseFirestore } from '../services/firebase-service';
import { Product } from './api-products.types';
import { Dictionary } from '@reduxjs/toolkit';

export const updateProduct = ({ id, ...rest }: Product) => {
  return firebaseFirestore
    .collection('products')
    .doc(id)
    .set(rest, { merge: true });
};

export const getProductList = async () => {
  const products: Dictionary<Product> = {};
  const ref = await firebaseFirestore.collection('products').get();

  ref.forEach((doc: any) => {
    products[doc.id] = { ...doc.data(), id: doc.id };
  });

  return products;
};

export const deleteProduct = (id: string) =>
  firebaseFirestore.collection('products').doc(id).delete();
