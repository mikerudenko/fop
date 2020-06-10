import React, { memo, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Button from '@material-ui/core/Button';
import { useFormContext } from 'react-hook-form';

export type FormFieldFileProps = {
  name: string;
  uploadLabel: string;
};

export const FormFieldFile = memo(
  ({ name, uploadLabel }: FormFieldFileProps) => {
    const { setValue, getValues } = useFormContext();
    const [internalFile, setInternalFile] = useState<any>(getValues()[name]);

    const { getRootProps, getInputProps } = useDropzone({
      accept: '*',
      onDrop: ([file]) => {
        setInternalFile(file);
        setValue(name, file);
      },
    });

    return (
      <section className='container'>
        <div {...getRootProps({ className: 'dropzone' })}>
          <input {...getInputProps()} />
          <Button
            variant='contained'
            color='default'
            startIcon={<CloudUploadIcon />}
          >
            {uploadLabel}
          </Button>
          {internalFile && internalFile?.name}
        </div>
      </section>
    );
  },
);
