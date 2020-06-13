import { Invoice } from '../api';

export const getInitialInvocieValues = () => {
  const date = new Date();

  return {
    id: null,
    products: [],
    status: 'pending',
    payerId: '',
    addition: '',
    date: date.toISOString(),
  } as Invoice;
};
