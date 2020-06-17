import React, { memo, useState } from 'react';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Button from '@material-ui/core/Button';
import { useFormContext } from 'react-hook-form';
import { useFormFieldFileStyles } from './use-form-field-file-styles';
import { useAutoEffect, useAutoCallback } from 'hooks.macro';

export type FormFieldFileProps = {
  name: string;
};

export const FormFieldFile = memo(({ name }: FormFieldFileProps) => {
  const { setValue, register } = useFormContext();
  const classes = useFormFieldFileStyles();
  const [file, setFile] = useState<null | File>(null);

  useAutoEffect(() => {
    register({ name });
  });

  const onChange = useAutoCallback(
    ({
      target: {
        files: [file],
      },
    }) => {
      ;
      setValue(name, file);
      setFile(file);
    },
  );

  return (
    <>
      <input
        accept='*'
        className={classes.input}
        style={{ display: 'none' }}
        id='raised-button-file'
        multiple
        onChange={onChange}
        type='file'
      />
      <label htmlFor='raised-button-file' className={classes.label}>
        <Button
          variant='contained'
          component='span'
          className={classes.button}
          endIcon={<CloudUploadIcon />}
        >
          Завантажити
        </Button>
        {file?.name}
      </label>
    </>
  );
});
