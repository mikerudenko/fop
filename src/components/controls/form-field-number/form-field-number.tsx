import React, { memo } from 'react';
import c from 'classnames';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';

import { FormFieldError } from '../form-field-error';
import { hasError } from '../../../services/form-service';
// import { NumberFormatCustom } from './number-format-custom';
import { useFormFieldNumberStyles } from './use-form-field-number-styles';
import { useFormContext } from 'react-hook-form';

export type FormFieldNumberProps = {
  label: string;
  required?: boolean;
  className?: string;
  name: string;
};
export const FormFieldNumber = memo(
  ({ label, className, required, name }: FormFieldNumberProps) => {
    const classes = useFormFieldNumberStyles();
    const {
      register,
      errors,
      formState: { dirty },
    } = useFormContext();
    const { showError, error } = hasError({ errors, name, dirty });

    return (
      <FormControl
        error={showError}
        className={c(classes.formControl, className)}
      >
        <TextField
          {...{
            inputRef: register,
            name,
            label,
          }}
          variant='outlined'
          inputProps={{ step: '0.01' }}
          type='number'
          error={showError}
          className={classes.input}
        />
        <FormFieldError
          {...{
            showError,
            error,
          }}
        />
      </FormControl>
    );
  },
);
