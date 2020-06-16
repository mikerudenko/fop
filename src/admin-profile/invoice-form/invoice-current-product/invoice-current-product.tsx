import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { multiply, format } from 'mathjs';
import React, { memo, useCallback } from 'react';
import { useFormContext } from 'react-hook-form';
import { FormField } from '../../../components/controls/form-field';
import { useInvoiceCurrentProductStyles } from './use-invoice-current-product-styles';
import { AppSelectOptionType } from '../../../components/controls/app-select';
import { Dictionary } from '@reduxjs/toolkit';
import { Product } from '../../../api';

type InvoiceCurrentProductProps = {
  appendProduct(products: any): void;
  productSelectList: AppSelectOptionType[];
  productList: Dictionary<Product>;
};

export const InvoiceCurrentProduct = memo(
  ({
    appendProduct,
    productSelectList,
    productList,
  }: InvoiceCurrentProductProps) => {
    const classes = useInvoiceCurrentProductStyles();
    const { getValues, setValue } = useFormContext();

    const onAddProductClick = useCallback(() => {
      const { currentProduct, quantity } = getValues();
      if (!currentProduct || !quantity) {
        return;
      }

      const product = productList![currentProduct];
      const sum = Number(
        format(multiply(Number(quantity), product!.price), { precision: 14 }),
      );

      appendProduct({ ...product, quatity: Number(quantity), sum });
      setValue('quantity', '');
    }, [getValues, appendProduct, productList, setValue]);

    return (
      <Grid item xs={12}>
        <div className={classes.container}>
          <FormField
            name='currentProduct'
            type='autocomplete'
            required
            options={productSelectList}
            label='Виберіть товар'
            className={classes.productInput}
          />
          <FormField
            name='quantity'
            type='number'
            required
            label='Вкажіть кількість'
            className={classes.countInput}
          />
          <Button
            color='primary'
            variant='contained'
            onClick={onAddProductClick}
            className={classes.button}
          >
            Додати у таблицю
          </Button>
        </div>
      </Grid>
    );
  },
);
