import React, { memo, useMemo } from 'react';
import { AppModal } from '../../../components/app-modal';
import { UPDATE_PRODUCT_MODAL } from '../admin-products.constants';
import { AppForm } from '../../../components/app-form';
import { FormField } from '../../../components/controls/form-field';
import { AppSubmitButton } from '../../../components/app-button';
import { useUpdateProductModalLogic } from './use-update-product-modal-logic';

type UpdateProductModalProps = {
  idToUpdate: null | string;
};

export const UpdateProductModal = memo(
  ({ idToUpdate }: UpdateProductModalProps) => {
    const {
      onSubmit,
      modalStatus,
      title,
      initialValues,
    } = useUpdateProductModalLogic(idToUpdate);

    const content = useMemo(
      () => (
        <AppForm
          onSubmit={onSubmit}
          formConfig={{ defaultValues: initialValues }}
        >
          <FormField name='id' type='text' disabled label='ID' />
          <FormField name='code' type='text' required label='Код' />
          <FormField name='name' type='text' required label='Найменування' />
          <FormField name='price' type='text' required label='Ціна' />
          <AppSubmitButton color='primary' text='Зберегти' />
        </AppForm>
      ),
      [onSubmit, initialValues],
    );

    return (
      <AppModal
        modalStatus={modalStatus}
        id={UPDATE_PRODUCT_MODAL}
        title={title}
        content={content}
        maxWidth='md'
        disableBackdropClick
      />
    );
  },
);
