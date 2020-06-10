import React, { memo } from 'react';
import { AppSubmitButton } from '../components/app-button/app-submit-button';
import { AppForm } from '../components/app-form';
import { FormField } from '../components/controls/form-field';
import { validationResolver } from './sign-in.validation';
import { useSignInLogic } from './use-sign-in-logic';
import { useSignInStyles } from './use-sign-in-styles';

export const SignIn = memo(() => {
  const { onSubmit } = useSignInLogic();
  const classes = useSignInStyles();

  return (
    <div className={classes.formWrapper}>
      <AppForm
        onSubmit={onSubmit}
        className={classes.form}
        formConfig={{ validationResolver }}
      >
        <FormField
          name='email'
          type='email'
          required
          label='Електронна пошта'
        />
        <FormField name='password' type='password' required label='Пароль' />
        <AppSubmitButton color='primary' text='Вхід' />
      </AppForm>
    </div>
  );
});
