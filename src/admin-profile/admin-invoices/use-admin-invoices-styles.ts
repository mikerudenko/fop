import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export const useAdminInvoicesStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      position: 'relative',
      maxWidth: 1000,
      margin: '0 auto',
    },
    controls: {
      marginBottom: theme.spacing(2),
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
    },
  }),
);
