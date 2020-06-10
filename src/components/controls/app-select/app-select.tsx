import React, { memo, useEffect, useState, useRef } from 'react';
import c from 'classnames';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';

import { useAppSelectStyles } from './use-app-select-styles';
import { AppSelectProps } from './app-select.types';
import { FormFieldError } from '../form-field-error';

const MenuProps = {
  getContentAnchorEl: null,
  anchorOrigin: {
    vertical: 'bottom' as const,
    horizontal: 'left' as const,
  },
};

export const AppSelect = memo(
  ({
    register,
    onChange,
    options,
    showError = false,
    error,
    className,
    label,
    name,
    labelValues,
  }: AppSelectProps) => {
    const [labelWidth, setLabelWidth] = useState(0);
    const inputLabel = useRef<HTMLLabelElement>(null);
    const classes = useAppSelectStyles();

    useEffect(() => {
      setLabelWidth(inputLabel.current!.offsetWidth);
    }, []);

    return (
      <FormControl
        variant='outlined'
        error={showError}
        className={c(classes.formControl, className)}
      >
        <InputLabel ref={inputLabel}>{label}</InputLabel>
        <Select
          {...{
            name,
            onChange,
            MenuProps,
          }}
          ref={register}
          labelWidth={labelWidth}
        >
          {options.map(({ label, value }, key) => (
            <MenuItem value={value} key={key}>
              {label}
            </MenuItem>
          ))}
        </Select>
        <FormFieldError
          {...{ showError, error }}
          className={classes.errorLabel}
        />
      </FormControl>
    );
  },
);
