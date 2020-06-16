export enum ProductType {
  build = 'build',
  chemistry = 'chemistry',
  linens = 'linens',
  tableware = 'tableware',
  value = "value"
}

export type Product = {
  id: string;
  code: number;
  name: string;
  price: number;
  productType: ProductType;
};
