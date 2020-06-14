import React, { memo, useEffect } from 'react';
import { InvoiceForm } from '../invoice-form';
import { getInitialInvocieValues } from '../admin-profile.constants';
import { H4 } from '../../components/typography/h4';
import { useAuthConnect } from '../../store/auth';
import { AppLoader } from '../../components/app-loader/app-loader';

export const CreateInvoice = memo(() => {
  const { authData } = useAuthConnect();
  const id = Number(authData?.lastInvocieNumber) + 1;

  useEffect(() => {}, []);

  if (!authData) {
    return <AppLoader />;
  }

  return (
    <>
      <H4>Створення Рахунку № {id}</H4>
      <InvoiceForm
        initialValues={getInitialInvocieValues(id)}
        submitText='Створити Рахунок'
      />
    </>
  );
});
