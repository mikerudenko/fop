import React, { memo } from 'react';
import { InvoiceForm } from '../invoice-form';
import { H4 } from '../../components/typography/h4';
import { AppLoader } from '../../components/app-loader';
import { useGetCurrentInvoice } from '../../store/invoices/use-get-current-invoice';

export const EditInvoice = memo(() => {
  const currentInvoice = useGetCurrentInvoice();

  if (!currentInvoice) {
    return <AppLoader />;
  }

  return (
    <>
      <H4>Редагування Рахунку</H4>
      <InvoiceForm
        initialValues={currentInvoice}
        submitText='Редагувати рахунок'
      />
    </>
  );
});
