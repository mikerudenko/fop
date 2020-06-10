type InvoiceProduct = {
  id: string;
  count: number;
};

export type Invoice = {
  date: string;
  id: string;
  products: InvoiceProduct[];
  customerId: string;
  status: 'pending' | 'payed';
};
