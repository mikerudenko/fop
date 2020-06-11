import React, { memo, useMemo } from 'react';
import { AppModal } from '../../../components/app-modal';
import { UPDATE_CUSTOMER_MODAL } from '../admin-customers.constants';
import { AppForm } from '../../../components/app-form';
import { FormField } from '../../../components/controls/form-field';
import { AppSubmitButton } from '../../../components/app-button';
import { useUpdateCustomerModalLogic } from './use-update-customer-modal-logic';
import Grid from '@material-ui/core/Grid';

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
          <Grid container spacing={2}>
            <Grid item md={6}>
              <FormField name='id' type='text' disabled label='ID' />
              <FormField name='code' type='text' required label='Код ЄДРОПУ' />
              <FormField
                name='name'
                type='text'
                required
                label='Найменування'
              />
              <FormField name='rr' type='text' required label='РР' />
            </Grid>
            <Grid item md={6}>
              <FormField
                name='phone'
                type='mask'
                mask='phone'
                required
                label='Телефон'
              />
              <FormField name='address' type='text' required label='Адреса' />
              <FormField name='ipn' type='text' required label='ІПН' />
              <FormField name='mfo' type='text' required label='МФО' />
            </Grid>
            <Grid item md={4}>
              <AppSubmitButton color='primary' text='Зберегти' />
            </Grid>
          </Grid>
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
