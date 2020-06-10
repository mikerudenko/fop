import React, { useCallback } from 'react';
import NumberFormat from 'react-number-format';

type NumberFormatCustomProps = {
  inputRef: (instance: NumberFormat | null) => void;
  onChange: (event: { target: { value: string } }) => void;
};

export const NumberFormatCustom = (props: NumberFormatCustomProps) => {
  const { inputRef, onChange, ...other } = props;

  const onValueChange = useCallback(
    (values) => {
      onChange({
        target: {
          value: values.floatValue,
        },
      });
    },
    [onChange],
  );

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={onValueChange}
      thousandSeparator
      isNumericString
    />
  );
};
