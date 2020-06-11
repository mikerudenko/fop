import React, { memo } from 'react';
import { FormFields, FormFieldType } from './form-field.constants';

export type FormFieldProps = {
  type: FormFieldType;
  name: string;
  label: string;
  required?: boolean;
  multiline?: boolean;
  rows?: number;
  disabled?: boolean;
  mask?: 'phone';
};

export const FormField = memo(({ type, ...rest }: FormFieldProps) => {
  // @ts-ignore
  const Field = FormFields[type];
  return <Field type={type} {...rest} />;
});
