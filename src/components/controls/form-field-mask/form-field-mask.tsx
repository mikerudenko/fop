import React, { memo } from 'react';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import InputMask from 'react-input-mask';

import { useAppPhoneFieldStyles } from './use-form-field-mask-styles';
import { hasError } from '../../../services/form-service';
import { useFormContext, Controller } from 'react-hook-form';
import { FormFieldError } from '../form-field-error';
import { MaskMap } from './form-field-mask.constants';

export type FormFieldMaskProps = {
  label: string;
  required?: boolean;
  mask: 'phone' | 'card';
  name: string;
};

export const FormFieldMask = memo(
  ({ label, mask, name }: FormFieldMaskProps) => {
    const classes = useAppPhoneFieldStyles();
    const {
      errors,
      control,
      register,
      formState: { dirty },
    } = useFormContext();
    const { showError, error } = hasError({ errors, name, dirty });
    return (
      <FormControl error={showError} className={classes.wrapper}>
        <Controller
          control={control}
          name={name}
          as={
            <InputMask mask={MaskMap[mask]}>
              {(inputProps: any) => (
                <TextField
                  {...inputProps}
                  ref={register}
                  {...{
                    label,
                  }}
                  variant='outlined'
                  error={showError}
                  className={classes.input}
                />
              )}
            </InputMask>
          }
        />
        <FormFieldError {...{ name, showError, error }} />
      </FormControl>
    );
  },
);
