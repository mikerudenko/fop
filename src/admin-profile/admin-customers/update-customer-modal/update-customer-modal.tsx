import React, { memo, useMemo } from 'react';
import { AppModal } from '../../../components/app-modal';
import { UPDATE_CUSTOMER_MODAL } from '../admin-customers.constants';
import { AppForm } from '../../../components/app-form';
import { FormField } from '../../../components/controls/form-field';
import { AppSubmitButton } from '../../../components/app-button';
import { useUpdateCustomerModalLogic } from './use-update-customer-modal-logic';

type UpdateCustomerModalProps = {
  idToUpdate: null | string;
};

export const UpdateCustomerModal = memo(
  ({ idToUpdate }: UpdateCustomerModalProps) => {
    const {
      onSubmit,
      modalStatus,
      title,
      initialValues,
    } = useUpdateCustomerModalLogic(idToUpdate);

    const content = useMemo(
      () => (
        <AppForm
          onSubmit={onSubmit}
          formConfig={{ defaultValues: initialValues }}
        >
          <FormField name='id' type='text' disabled label='ID' />
          <FormField name='code' type='text' required label='Код' />
          <FormField name='name' type='text' required label='Найменування' />
          <FormField name='rr' type='text' required label='РР' />
          <AppSubmitButton color='primary' text='Зберегти' />
        </AppForm>
      ),
      [onSubmit, initialValues],
    );

    return (
      <AppModal
        modalStatus={modalStatus}
        id={UPDATE_CUSTOMER_MODAL}
        title={title}
        content={content}
        maxWidth='md'
        disableBackdropClick
      />
    );
  },
);
