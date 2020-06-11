import noop from 'lodash/noop';
import { MetaThunk } from '../app.types';

export const prepareAction = <T>(
  payload: T,
  meta?: MetaThunk,
  error?: boolean,
) => ({
  payload,
  meta,
  error,
});

export const noopAction = {
  reducer: noop,
  prepare: prepareAction,
};

// export const actionWithMeta = (reducer: ActionCreatorWithoutPayload<string>) => ({
//   reducer: reducer,
//   prepare: prepareAction,
// });
