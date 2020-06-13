import React, { memo, useCallback, useMemo } from 'react';
import { AppRemoveButton } from '../app-button/app-remove-button';
import { useProductTableStyles } from './use-product-table-styles';
import { InvoiceProduct } from '../../api';

type ProductsTableProps = {
  products: InvoiceProduct[];
  showActions: boolean;
  removeProduct(index: number): void;
};

export const ProductsTable = memo(
  ({ products, showActions, removeProduct }: ProductsTableProps) => {
    const classes = useProductTableStyles();

    const renderProductRow = useCallback(
      ({ code, name, price, quatity, sum }, index) => {
        return (
          <tr key={index}>
            <td className={classes.td}>{index + 1}</td>
            <td className={classes.td}>{code}</td>
            <td className={classes.td}>{name}</td>
            <td className={classes.td}>{price}</td>
            <td className={classes.td}>{quatity}</td>
            <td className={classes.td}>{sum}</td>
            {showActions && (
              <td className={classes.td}>
                <AppRemoveButton onClick={() => removeProduct(index)} />
              </td>
            )}
          </tr>
        );
      },
      [removeProduct, showActions, classes.td],
    );

    // TODO add math.js
    const commonPrice = useMemo(
      () => products.reduce((commonSum, { sum }) => commonSum + sum, 0),
      [products],
    );

    return (
      <table className={classes.table}>
        <thead>
          <tr>
            <th className={classes.th}>№</th>
            <th className={classes.th}>Код</th>
            <th className={classes.th}>Найменування</th>
            <th className={classes.th}>Ціна</th>
            <th className={classes.th}>Кількість</th>
            <th className={classes.th}>Сумма</th>
          </tr>
        </thead>
        <tbody>
          {products.map(renderProductRow)}
          <tr>
            <td colSpan={5} className={classes.commonPrice}>
              Загальна сумма
            </td>
            <td className={classes.th}>{commonPrice}</td>
          </tr>
        </tbody>
      </table>
    );
  },
);
