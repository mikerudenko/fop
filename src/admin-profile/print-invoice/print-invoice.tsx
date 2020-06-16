import Grid from '@material-ui/core/Grid';
import c from 'classnames';
import format from 'date-fns/format';
import uaLocale from 'date-fns/locale/uk';
import { useAutoEffect } from 'hooks.macro';
import React, { memo } from 'react';
import { Customer } from '../../api';
import { ROUTES } from '../../app.constants';
import { AppLink } from '../../components/app-link';
import { AppLoader } from '../../components/app-loader';
import { ProductsTable } from '../../components/products-table';
import { H5 } from '../../components/typography/h5';
import { useAuthConnect } from '../../store/auth/use-auth-connect';
import { useCustomersConnect } from '../../store/customers/use-customers-connect';
import { useGetCurrentInvoice } from '../../store/invoices/useGetCurrentInvoice';
import { usePrintInvoiceStyles } from './use-print-invoice-styles';
import Button from '@material-ui/core/Button';
import PrintIcon from '@material-ui/icons/Print';

export const PrintInvoice = memo(() => {
  const classes = usePrintInvoiceStyles();
  const currentInvoice = useGetCurrentInvoice();
  const { authData, GetAuthDataRequest } = useAuthConnect();
  const { customerList, GetCustomerListRequest } = useCustomersConnect();

  useAutoEffect(() => {
    if (!authData) {
      GetAuthDataRequest();
    }

    if (!customerList) {
      GetCustomerListRequest();
    }
  });

  if (!currentInvoice || !authData || !customerList) {
    return <AppLoader />;
  }

  const customer = customerList[currentInvoice.payerId] as Customer;

  return (
    <Grid container>
      <Grid item xs={10}>
        <div className={classes.topBar}>
          <AppLink
            variant='subtitle1'
            className={classes.backToLink}
            to={ROUTES.admin + ROUTES.invoices}
            text='Назад'
          />
          <Button
            variant='contained'
            className={classes.printButton}
            onClick={window.print}
            color='primary'
            endIcon={<PrintIcon />}
          >
            Друкувати
          </Button>
        </div>
        <H5 className={classes.heading}>
          Рахунок № {currentInvoice.id} від{' '}
          {format(new Date(currentInvoice.date), 'dd MMMM yyyy', {
            locale: uaLocale,
          })}
        </H5>
        <Grid className={classes.topBox} container>
          <Grid item xs={12} className={classes.infoRow}>
            <span className={classes.label}>Постачальник:</span> {authData.name}
          </Grid>
          <Grid item xs={6} className={classes.infoRow}>
            <span className={classes.label}>РР :</span> {authData.rr}
          </Grid>
          <Grid item xs={6} className={classes.infoRow}>
            <span className={classes.label}>в</span> {authData.bank}
          </Grid>
          <Grid item xs={6} className={classes.infoRow}>
            <span className={classes.label}>ЄДРПОУ :</span> {authData.code}
          </Grid>
          <Grid item xs={6} className={classes.infoRow}>
            <span className={classes.label}>МФО :</span> {authData.mfo}
          </Grid>
          <Grid item xs={12} className={classes.infoRow}>
            <span className={classes.label}>Платник :</span> {customer.name}, РР
            - {customer.rr}, ЄДРПОУ - {customer.code}, ІПН - {customer.ipn}, МФО
            - {customer.mfo}, Адреса - {customer.address}
          </Grid>
          <Grid item xs={12} className={classes.infoRow}>
            <span className={classes.label}>Доповнення :</span>{' '}
            {currentInvoice.addition}
          </Grid>
        </Grid>
        <ProductsTable products={currentInvoice.products} />
        <div className={classes.sumBox}>
          <span className={c(classes.label, classes.infoRow)}>
            Сумму до сплати:
          </span>
        </div>
        <Grid className={classes.bottomBox} container>
          <Grid item xs={6} className={classes.infoRow}>
            <span className={classes.label}>Директор :</span>
          </Grid>
          <Grid item xs={6} className={classes.infoRow}>
            <span className={classes.label}>Головний бугалтер :</span>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
});
