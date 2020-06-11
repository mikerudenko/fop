import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const useFormFieldDateStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      width: '100%',
      marginBottom: 10,
    },
  }),
);
