import TextField from '@material-ui/core/TextField';
import React, { memo } from 'react';
import { useFormContext } from 'react-hook-form';
import { hasError } from '../../../services/form-service';
import { FormFieldError } from '../form-field-error';
import { useFormAutocompleteStyles } from './use-form-field-autocomplete-styles';
import FormControl from '@material-ui/core/FormControl';
import c from 'classnames';
import { AppSelectOptionType } from '../app-select';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { getSelectOptionById } from '../../../services/helper-service';
import { useAutoCallback, useAutoEffect } from 'hooks.macro';

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
      getValues,
      register,
      setValue,
      formState: { dirty },
    } = useFormContext();
    const classes = useFormAutocompleteStyles();
    const { showError, error } = hasError({ errors, name, dirty });
    const value = getValues()[name];
    const selectedValue = value && getSelectOptionById(options, value);

    useAutoEffect(() => {
      register({ name });
    });

    const onChange = useAutoCallback((_, { value }) => setValue(name, value));

    return (
      <FormControl
        error={showError}
        className={c(classes.formControl, className)}
      >
        <Autocomplete
          options={options}
          getOptionLabel={({ label }: AppSelectOptionType) => label}
          onChange={onChange}
          value={selectedValue}
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
        <FormFieldError {...{ name, showError, error }} />
      </FormControl>
    );
  },
);
