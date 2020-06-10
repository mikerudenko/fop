export enum ROUTES {
  signIn = '/sign-in',
  admin = '/admin',
  products = '/products',
  customers = '/customers',
  notFound = '/not-found',
  invoices = '/invoices',
}

export const FLEX_CENTER_BETWEEN = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

export const FLEX_CENTER_START = {
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
};

export const META_THUNK = {
  thunk: true,
};

export const AppTheme = {
  palette: {
    primary: {
      main: '#2690A8',
    },
    secondary: {
      main: '#FF6927',
    },
  },
};
