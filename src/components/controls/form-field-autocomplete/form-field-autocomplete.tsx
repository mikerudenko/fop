import TextField from '@material-ui/core/TextField';
import React, { memo } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { hasError } from '../../../services/form-service';
import { FormFieldError } from '../form-field-error';
import { useFormAutocompleteStyles } from './use-form-field-autocomplete-styles';
import FormControl from '@material-ui/core/FormControl';
import c from 'classnames';
import { AppSelectOptionType } from '../app-select';
import Autocomplete from '@material-ui/lab/Autocomplete';

export type FormFieldAutocompleteProps = {
  label: string;
  name: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  options: AppSelectOptionType[];
};

export const FormFieldAutocomplete = memo(
  ({
    name,
    label,
    disabled,
    options,
    className,
  }: FormFieldAutocompleteProps) => {
    const {
      errors,
      control,
      formState: { dirty },
    } = useFormContext();
    const classes = useFormAutocompleteStyles();
    const { showError, error } = hasError({ errors, name, dirty });

    return (
      <FormControl
        error={showError}
        className={c(classes.formControl, className)}
      >
        <Controller
          as={
            <Autocomplete
              options={options}
              getOptionLabel={(option) => option.label}
              renderInput={(params) => (
                <TextField
                  {...{
                    ...params,
                    label,
                    disabled,
                  }}
                  variant='outlined'
                  error={showError}
                  className={classes.input}
                />
              )}
            />
          }
          onChange={([, data]) => data}
          name={name}
          control={control}
        />

        <FormFieldError {...{ name, showError, error }} />
      </FormControl>
    );
  },
);
