import React, { memo } from 'react';
import { Invoice, Product } from '../../api';
import { AppForm } from '../../components/app-form';
import { useInvoiceFormLogic } from './use-invoice-form-logic';
import { AppLink } from '../../components/app-link';
import { useInvoiceFormStyles } from './use-invoice-form-styles';
import { ROUTES } from '../../app.constants';
import Grid from '@material-ui/core/Grid';
import { FormField } from '../../components/controls/form-field';
import { invoiceStatusSelectList } from './invoice-form.constants';
import { ProductsTable } from '../../components/products-table';
import { InvoiceCurrentProduct } from './invoice-current-product';
import { AppSubmitButton } from '../../components/app-button';
import { Dictionary } from '@reduxjs/toolkit';
import { AppLoader } from '../../components/app-loader/app-loader';

type InvoiceFormProps = {
  initialValues: Invoice;
  submitText: string;
};

export const InvoiceForm = memo(({ initialValues }: InvoiceFormProps) => {
  const {
    onSubmit,
    customerSelectList,
    appendProduct,
    removeProduct,
    products,
    productSelectList,
    productList,
    loading,
  } = useInvoiceFormLogic(initialValues);
  const classes = useInvoiceFormStyles();

  const formConfig = {
    defaultValues: initialValues,
  };

  if (loading) {
    return <AppLoader />;
  }

  return (
    <div className={classes.formWrapper}>
      <div className={classes.topBar}>
        <AppLink
          variant='subtitle1'
          className={classes.backToLink}
          to={ROUTES.admin + ROUTES.invoices}
          text='Назад'
        />
      </div>
      <AppForm onSubmit={onSubmit} formConfig={formConfig}>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <FormField name='date' type='date' required label='Від' />
            <FormField
              name='status'
              type='autocomplete'
              required
              label='Статус'
              options={invoiceStatusSelectList}
            />
          </Grid>
          <Grid item xs={6}>
            <FormField
              name='payerId'
              type='autocomplete'
              required
              label='Платник'
              options={customerSelectList}
            />
            <FormField
              name='addition'
              type='text'
              required
              label='Доповнення'
            />
          </Grid>
          <InvoiceCurrentProduct
            appendProduct={appendProduct}
            productSelectList={productSelectList}
            productList={productList as Dictionary<Product>}
          />
          <Grid item xs={12}>
            <ProductsTable
              showActions
              products={products}
              removeProduct={removeProduct}
            />
          </Grid>
          <Grid item md={4}>
            <AppSubmitButton color='primary' text='Зберегти' />
          </Grid>
        </Grid>
      </AppForm>
    </div>
  );
});
