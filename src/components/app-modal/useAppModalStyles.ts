import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';

export const useAppModalStyles = makeStyles((theme: Theme) =>
  createStyles({
    header: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      margin: 0,
    },
    closeButton: {
      color: theme.palette.grey[500],
      padding: theme.spacing(1),
    },
    paper: {
      minWidth: 630,
    },
  }),
);
