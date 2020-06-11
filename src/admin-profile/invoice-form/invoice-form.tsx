import React, { memo } from 'react';
import { Invoice } from '../../api';
import { AppForm } from '../../components/app-form';
import { useInvoiceFormLogic } from './use-invoice-form-logic';
import { AppLink } from '../../components/app-link';
import { useInvoiceFormStyles } from './use-invoice-form-styles';
import { ROUTES } from '../../app.constants';
import Grid from '@material-ui/core/Grid';
import { FormField } from '../../components/controls/form-field';
import { invoiceStatusSelectList } from './invoice-form.constants';
import { InvoiceCurrentProduct } from './invoice-current-product';

type InvoiceFormProps = {
  initialValues: Invoice;
  submitText: string;
};

export const InvoiceForm = memo(({ initialValues }: InvoiceFormProps) => {
  const { onSubmit, customerSelectList } = useInvoiceFormLogic();
  const classes = useInvoiceFormStyles();

  return (
    <>
      <div className={classes.topBar}>
        <AppLink
          variant='subtitle1'
          className={classes.backToLink}
          to={ROUTES.admin + ROUTES.invoices}
          text='Назад'
        />
      </div>
      <AppForm onSubmit={onSubmit}>
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
              name='status'
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
          <InvoiceCurrentProduct />
        </Grid>
      </AppForm>
    </>
  );
});
