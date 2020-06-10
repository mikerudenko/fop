import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export const useAdminProductsTableActionsStyles = makeStyles((theme: Theme) =>
  createStyles({
    actions: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
    },
  }),
);
