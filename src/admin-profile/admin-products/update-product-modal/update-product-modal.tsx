import React, { memo } from 'react';
import { AppModal } from '../../../components/app-modal';
import {
  UPDATE_PRODUCT_MODAL,
  PRODUCT_TYPE_SELECT_LIST,
} from '../admin-products.constants';
import { AppForm } from '../../../components/app-form';
import { FormField } from '../../../components/controls/form-field';
import { AppSubmitButton } from '../../../components/app-button';
import { useUpdateProductModalLogic } from './use-update-product-modal-logic';
import { useAutoMemo } from 'hooks.macro';

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

    const formConfig = useAutoMemo(() => ({
      defaultValues: initialValues,
    }));

    const content = useAutoMemo(() => (
      <AppForm {...{ onSubmit, formConfig }}>
        <FormField name='id' type='text' disabled label='ID' />
        <FormField name='code' type='text' required label='Код' />
        <FormField name='name' type='text' required label='Найменування' />
        <FormField name='price' type='number' required label='Ціна' />
        <FormField
          name='productType'
          type='autocomplete'
          label='Тип продукції'
          options={PRODUCT_TYPE_SELECT_LIST}
        />
        <AppSubmitButton color='primary' text='Зберегти' />
      </AppForm>
    ));

    return (
      <AppModal
        modalStatus={modalStatus}
        id={UPDATE_PRODUCT_MODAL}
        title={title}
        content={content}
        maxWidth='sm'
        disableBackdropClick
      />
    );
  },
);
