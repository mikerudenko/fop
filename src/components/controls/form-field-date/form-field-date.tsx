import React from 'react';
import { KeyboardDatePicker } from '@material-ui/pickers';
import c from 'classnames';

import { useFormFieldDateStyles } from './use-form-field-date-styles';
import { useFormContext, Controller } from 'react-hook-form';
import { hasError } from '../../../services/form-service';
import { FormFieldError } from '../form-field-error';
import FormControl from '@material-ui/core/FormControl';

type FormFieldDateProps = {
  label: string;
  name: string;
};

export const FormFieldDate = ({ label, name }: FormFieldDateProps) => {
  const classes = useFormFieldDateStyles();
  const {
    control,
    errors,
    formState: { dirty },
  } = useFormContext();
  const { showError, error } = hasError({ errors, name, dirty });

  return (
    <FormControl error={showError} className={c(classes.formControl)}>
      <Controller
        control={control}
        name={name}
        as={
          <KeyboardDatePicker
            label={label}
            autoOk
            onChange={() => {}}
            format='dd/MM/yyyy'
            value={() => {}}
            inputVariant='outlined'
          />
        }
      />
      <FormFieldError {...{ name, showError, error }} />
    </FormControl>
  );
};
