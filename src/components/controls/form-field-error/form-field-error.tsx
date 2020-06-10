import React, { memo } from 'react';
import { useFormFieldErrorStyles } from './use-form-field-error-styles';
import FormHelperText from '@material-ui/core/FormHelperText';
import c from 'classnames';

export type FormFieldErrorProps = {
  showError: boolean;
  error?: string;
  className?: string;
};

export const FormFieldError = memo(
  ({ showError, error, className }: FormFieldErrorProps) => {
    const classes = useFormFieldErrorStyles();
    return showError && error ? (
      <FormHelperText color='primary' className={c(classes.error, className)}>
        {error}
      </FormHelperText>
    ) : (
      <span className={classes.stub} />
    );
  },
);
