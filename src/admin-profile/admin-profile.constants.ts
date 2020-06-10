import { Invoice } from '../api';

export const getInitialInvocieValues = () => {
  const date = new Date();
  const id = String(date);

  return {
    id,
    products: [],
    status: 'pending',
    customerId: '',
    date: date.toISOString(),
  } as Invoice;
};
