import React, { memo } from 'react';
import { InvoiceForm } from '../invoice-form';
import { getInitialInvocieValues } from '../admin-profile.constants';

export const CreateInvoice = memo(() => {
  return (
    <InvoiceForm
      initialValues={getInitialInvocieValues()}
      submitText='Створити накладну'
    />
  );
});
