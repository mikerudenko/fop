import React, { memo } from 'react';
import { InvoiceForm } from '../invoice-form';
import { getInitialInvocieValues } from '../admin-profile.constants';
import { H4 } from '../../components/typography/h4';
import { useAuthConnect } from '../../store/auth';

export const CreateInvoice = memo(() => {
  const { authData } = useAuthConnect();
  return (
    <>
      <H4>Створення Рахунку № {Number(authData?.lastInvocieNumber) + 1}</H4>
      <InvoiceForm
        initialValues={getInitialInvocieValues()}
        submitText='Створити Рахунок'
      />
    </>
  );
});
