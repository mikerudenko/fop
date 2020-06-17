import React, { memo } from 'react';
import { AppModal } from '../../../components/app-modal';
import { UPDATE_DOCUMENT_MODAL } from '../admin-dcuments.constants';
import { AppForm } from '../../../components/app-form';
import { FormField } from '../../../components/controls/form-field';
import { AppSubmitButton } from '../../../components/app-button';
import { useUpdateDocumentModalLogic } from './use-update-document-modal-logic';
import { useAutoMemo } from 'hooks.macro';

type UpdateDocumentModalProps = {
  idToUpdate: null | string;
};

export const UpdateDocumentModal = memo(
  ({ idToUpdate }: UpdateDocumentModalProps) => {
    const {
      onSubmit,
      modalStatus,
      title,
      initialValues,
    } = useUpdateDocumentModalLogic(idToUpdate);

    const formConfig = useAutoMemo(() => ({
      defaultValues: {
        name: initialValues.name,
        id: initialValues.id,
        file: '',
      },
    }));

    const content = useAutoMemo(() => (
      <AppForm {...{ onSubmit, formConfig }}>
        <FormField name='id' type='text' disabled label='ID' />
        <FormField name='name' type='text' required label='Найменування' />
        <FormField name='file' type='file' required label='Файл' />
        <AppSubmitButton color='primary' text='Зберегти' />
      </AppForm>
    ));

    return (
      <AppModal
        modalStatus={modalStatus}
        id={UPDATE_DOCUMENT_MODAL}
        title={title}
        content={content}
        maxWidth='sm'
        disableBackdropClick
      />
    );
  },
);
