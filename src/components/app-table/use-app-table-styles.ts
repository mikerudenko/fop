import { makeStyles } from '@material-ui/core/styles';

export const useAppTableStyles = makeStyles({
  root: {
    width: '100%',
    overflowX: 'auto',
  },
  tableWrapper: {
    overflow: 'auto',
    position: 'relative',
  },
  bodyCell: {
    height: 50,
  },
  noData: {
    textAlign: 'center',
  },
});
