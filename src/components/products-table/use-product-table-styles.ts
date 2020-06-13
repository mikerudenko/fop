import { makeStyles } from '@material-ui/styles';

export const useProductTableStyles = makeStyles({
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  th: {
    fontWeight: 'bold',
    textAlign: 'center',
    border: '1px solid black',
    borderCollapse: 'collapse',
  },
  td: {
    textAlign: 'center',
    border: '1px solid black',
    borderCollapse: 'collapse',
  },
  commonPrice: {
    fontWeight: 'bold',
    border: '1px solid black',
    borderCollapse: 'collapse',
    textAlign: 'right',
  },
});
