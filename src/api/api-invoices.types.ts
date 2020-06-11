type InvoiceProduct = {
  id: string;
  count: number;
  price: number;
};

export type Invoice = {
  date: string;
  id: string;
  products: InvoiceProduct[];
  payerId: string;
  addition: string;
  status: 'pending' | 'payed';
};
