import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import React, { memo, useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router';
import { useLocation } from 'react-router-dom';
import { ROUTES } from '../app.constants';
import { ProtectedRoute } from '../components/protected-route';
import { NotFound } from '../not-found';
import { SignIn } from '../sign-in';
import { useAuthConnect } from '../store/auth';
import { useNotificationsLogic } from '../store/notifications';
import { useRootStyles } from './use-root-styles';
import { AdminProfile } from '../admin-profile/invoice-form/admin-profile';

export const Root = memo(() => {
  const location = useLocation();
  const { user } = useAuthConnect();

  useRootStyles();
  useNotificationsLogic();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const hasAccess = !!user;

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale='ua'>
      <Switch>
        <Route path='/' exact component={SignIn} />
        <ProtectedRoute
          path={ROUTES.admin}
          component={AdminProfile}
          hasAccess={hasAccess}
        />
        <Route path={ROUTES.notFound} component={NotFound} />
        <Redirect to={ROUTES.notFound} />
      </Switch>
    </MuiPickersUtilsProvider>
  );
});
