import React, { memo } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { ROUTES } from '../../app.constants';

type ComponentType = import('react').ComponentType;

type ProtectedRouteProps = {
  hasAccess: boolean;
  component: ComponentType;
  path: string;
  exact?: boolean;
};

export const ProtectedRoute = memo(
  ({ hasAccess, component, path, exact }: ProtectedRouteProps) =>
    hasAccess ? (
      <Route {...{ exact, path, component }} />
    ) : (
      <Redirect to={ROUTES.notFound} />
    ),
);
