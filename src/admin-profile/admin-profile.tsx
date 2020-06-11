import React, { memo } from 'react';
import { Redirect, Route, Switch } from 'react-router';

import { ROUTES } from '../app.constants';
import { AppContainer } from '../components/app-container';
import { useAppAdminProfileStyles } from './use-admin-profile-styles';
import { AppTabs } from '../components/app-tabs';
import { AdminProducts } from './admin-products';
import { AdminCustomers } from './admin-customers';
import { AdminInvoices } from './admin-invoices';
import { CreateInvoice } from './create-invoice/create-invoice';
import { EditInvoice } from './edit-invoice';

const urlList = {
  products: ROUTES.admin + ROUTES.products,
  customers: ROUTES.admin + ROUTES.customers,
  invoices: ROUTES.admin + ROUTES.invoices,
  createInvoice: ROUTES.admin + ROUTES.createInvoice,
  editInvoice: ROUTES.admin + ROUTES.invoices + '/:id',
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
    label: 'Рахунки',
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
          <Route path={urlList.createInvoice} component={CreateInvoice} />
          <Route path={urlList.editInvoice} component={EditInvoice} />
          <Redirect to={urlList.products} />
        </Switch>
      </AppTabs>
    </AppContainer>
  );
});
