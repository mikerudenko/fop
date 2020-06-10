import React, { memo, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useInvoicesConnect } from '../../store/invoices/use-incoices-connect';
import { InvoiceForm } from '../invoice-form';

export const EditInvoice = memo(() => {
  const { id } = useParams();
  const { currentInvoice, GetInvoiceListRequest } = useInvoicesConnect(id);

  useEffect(() => {
    if (!currentInvoice) {
      GetInvoiceListRequest();
    }
  }, [GetInvoiceListRequest, currentInvoice]);

  if (!currentInvoice) {
    return null;
  }

  return (
    <InvoiceForm
      initialValues={currentInvoice}
      submitText='Редагувати накладну'
    />
  );
});
