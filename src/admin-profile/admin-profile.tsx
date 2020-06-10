import React, { memo } from 'react';
import { Redirect, Route, Switch } from 'react-router';

import { ROUTES } from '../app.constants';
import { AppContainer } from '../components/app-container';
import { useAppAdminProfileStyles } from './use-admin-profile-styles';
import { AppTabs } from '../components/app-tabs';
import { AdminProducts } from './admin-products';
import { AdminCustomers } from './admin-customers';
import { AdminInvoices } from './admin-invoices';

const urlList = {
  products: ROUTES.admin + ROUTES.products,
  invoices: ROUTES.admin + ROUTES.invoices,
  customers: ROUTES.admin + ROUTES.customers,
};

const tabs = [
  {
    label: 'Товари',
    to: urlList.products,
  },
  {
    label: 'Споживачі',
    to: urlList.customers,
  },
  {
    label: 'Накладні',
    to: urlList.invoices,
  },
];

export const AdminProfile = memo(() => {
  const classes = useAppAdminProfileStyles();
  return (
    <AppContainer>
      <AppTabs {...{ tabs }} isRouter wrapperClassName={classes.wrapper}>
        <Switch>
          <Route path={urlList.products} component={AdminProducts} />
          <Route path={urlList.customers} component={AdminCustomers} />
          <Route path={urlList.invoices} component={AdminInvoices} />
          <Redirect to={urlList.products} />
        </Switch>
      </AppTabs>
    </AppContainer>
  );
});
