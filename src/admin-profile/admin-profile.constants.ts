import { Invoice } from '../api';

export const getInitialInvocieValues = (id: number) => {
  const date = new Date();

  return {
    id: String(id),
    products: [],
    status: 'pending',
    payerId: '',
    addition: '',
    date: date.toISOString(),
  } as Invoice;
};
