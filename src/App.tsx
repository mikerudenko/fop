import {
  CssBaseline,
  unstable_createMuiStrictModeTheme as createMuiTheme,
  ThemeProvider,
} from '@material-ui/core';
import React, { memo } from 'react';
import { jssPreset, StylesProvider } from '@material-ui/styles';
import { createBrowserHistory } from 'history';
import { create } from 'jss';
import jssTemplate from 'jss-plugin-template';
import { Provider } from 'react-redux';
import { SnackbarProvider } from 'notistack';
import { ConnectedRouter } from 'connected-react-router';

import { PersistGate } from 'redux-persist/integration/react';

import { AppTheme } from './app.constants';
import { configureStore } from './store';
import { Root } from './root';

export const history = createBrowserHistory();

const jss = create({
  plugins: [jssTemplate(), ...jssPreset().plugins],
});
const theme = createMuiTheme(AppTheme);
const { store, persistor } = configureStore(history);

export const App = memo(() => {
  return (
    <ThemeProvider theme={theme}>
      <StylesProvider jss={jss}>
        <CssBaseline />
        <SnackbarProvider>
          <Provider store={store}>
            <ConnectedRouter history={history}>
              <PersistGate persistor={persistor}>
                <Root />
              </PersistGate>
            </ConnectedRouter>
          </Provider>
        </SnackbarProvider>
      </StylesProvider>
    </ThemeProvider>
  );
});
