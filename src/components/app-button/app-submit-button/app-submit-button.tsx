import Button, { ButtonProps } from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import c from 'classnames';
import React, { memo } from 'react';
import { useFormContext } from 'react-hook-form';
import { useAppSubmitButtonStyles } from './use-app-submit-button-styles';

interface AppSubmitButtonProps {
  text: string;
  size?: 'small' | 'medium' | 'large';
}

export const AppSubmitButton = memo(
  ({
    text,
    className,
    color,
    onClick,
    size = 'medium' as 'medium',
  }: AppSubmitButtonProps & ButtonProps) => {
    const classes = useAppSubmitButtonStyles();
    const {
      errors,
      formState: { isSubmitting },
    } = useFormContext();

    return (
      <div className={c(classes.wrapper, className)}>
        <Button
          type='submit'
          disabled={!!Object.keys(errors).length || isSubmitting}
          {...{
            size,
            className: classes.button,
            onClick,
            variant: 'outlined',
            color,
          }}
        >
          {text}
        </Button>
        {isSubmitting && (
          <CircularProgress size={24} className={classes.buttonProgress} />
        )}
      </div>
    );
  },
);
