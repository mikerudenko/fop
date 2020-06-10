import React, { memo } from 'react';
import { Invoice } from '../../api';

type InvoiceFormProps = {
  initialValues: Invoice;
  submitText: string;
};

export const InvoiceForm = memo(({ initialValues }: InvoiceFormProps) => {
  return (
    <div>
      Hello from invoice form
      {initialValues.toString()}
    </div>
  );
});
