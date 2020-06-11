import React, { memo, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useInvoicesConnect } from '../../store/invoices/use-incoices-connect';
import { InvoiceForm } from '../invoice-form';
import { H4 } from '../../components/typography/h4';
import { AppLoader } from '../../components/app-loader';

export const EditInvoice = memo(() => {
  const { id } = useParams();
  const { currentInvoice, GetInvoiceListRequest } = useInvoicesConnect(id);

  useEffect(() => {
    if (!currentInvoice) {
      GetInvoiceListRequest();
    }
  }, [GetInvoiceListRequest, currentInvoice]);

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
