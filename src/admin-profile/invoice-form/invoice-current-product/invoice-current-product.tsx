import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import React, { memo, useCallback, useEffect, useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
import { FormField } from '../../../components/controls/form-field';
import { useProductsConnect } from '../../../store/products';
import { useInvoiceCurrentProductStyles } from './use-invoice-current-product-styles';

export const InvoiceCurrentProduct = memo(() => {
  const { getValues } = useFormContext();
  const { productList, GetProductListRequest } = useProductsConnect();
  const classes = useInvoiceCurrentProductStyles();

  const productSelectList = useMemo(
    () =>
      productList
        ? Object.keys(productList).map((key) => ({
            value: productList[key]!.id,
            label: productList[key]!.name,
          }))
        : [],
    [productList],
  );

  const onAddProductClick = useCallback(() => {
    const { currentProduct, currentProductCount } = getValues();
    debugger;
  }, [getValues]);

  useEffect(() => {
    if (!productList) {
      GetProductListRequest();
    }
  }, [productList, GetProductListRequest]);

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
          name='currentProductCount'
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
});
