import { makeStyles } from '@material-ui/styles';

export const useInvoiceCurrentProductStyles = makeStyles({
  container: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  productInput: {
    width: 400,
    marginRight: 10,
  },
  countInput: {
    width: 200,
    marginRight: 10,
  },
  button: {
    marginTop: 10,
  },
});
