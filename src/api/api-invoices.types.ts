export type InvoiceProduct = {
  id: string;
  count: number;
  price: number;
  quantity: number;
  sum: number;
};

export type Invoice = {
  date: string;
  id: string | null;
  products: InvoiceProduct[];
  payerId: string;
  addition: string;
  status: 'pending' | 'payed';
};
