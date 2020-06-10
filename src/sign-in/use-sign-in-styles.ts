import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export const useSignInStyles = makeStyles((theme: Theme) =>
  createStyles({
    formWrapper: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: 340,
    },
    form: {
      paddingTop: '20px',
      width: '100%',
    },
  }),
);
