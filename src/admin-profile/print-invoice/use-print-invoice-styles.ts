import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';

export const usePrintInvoiceStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrapper: {
      marginTop: 40,
    },
    backToLink: {},
    topBar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 20,
    },
    heading: {
      marginBottom: theme.spacing(3),
    },
    topBox: {
      padding: theme.spacing(1),
      border: '1px solid black',
      marginBottom: theme.spacing(3),
    },
    sumBox: {
      padding: theme.spacing(1),
      border: '1px solid black',
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(3),
    },
    bottomBox: {
      padding: theme.spacing(1),
      border: '1px solid black',
    },
    label: {
      fontWeight: 'bold',
    },
    infoRow: {
      height: 25,
      lineHeight: '25px',
    },
    printButton: {},
    '@media print': {
      backToLink: {
        display: 'none',
      },
      printButton: {
        display: 'none',
      },
    },
  }),
);
