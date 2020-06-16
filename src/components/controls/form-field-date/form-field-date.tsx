import FormControl from '@material-ui/core/FormControl';
import { KeyboardDatePicker } from '@material-ui/pickers';
import c from 'classnames';
import { useAutoCallback, useAutoEffect } from 'hooks.macro';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { hasError } from '../../../services/form-service';
import { FormFieldError } from '../form-field-error';
import { useFormFieldDateStyles } from './use-form-field-date-styles';

type FormFieldDateProps = {
  label: string;
  name: string;
};

export const FormFieldDate = ({ label, name }: FormFieldDateProps) => {
  const classes = useFormFieldDateStyles();
  const {
    register,
    errors,
    getValues,
    setValue,
    formState: { dirty },
  } = useFormContext();
  const { showError, error } = hasError({ errors, name, dirty });
  const date = getValues()[name];
  const selectedDate = date && new Date(date);

  useAutoEffect(() => {
    register({ name });
  });

  const onChange = useAutoCallback((value) => {
    debugger;
    setValue(name, value.toISOString());
  });

  return (
    <FormControl error={showError} className={c(classes.formControl)}>
      <KeyboardDatePicker
        label={label}
        autoOk
        onChange={onChange}
        format='dd/MM/yyyy'
        value={selectedDate}
        inputVariant='outlined'
      />

      <FormFieldError {...{ name, showError, error }} />
    </FormControl>
  );
};
