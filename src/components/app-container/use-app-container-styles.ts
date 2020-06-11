import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

export const useAppContainerStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      width: 1200,
      margin: '0 auto',
      paddingTop: 20,
    },
  }),
);
