import React, { memo, useCallback, useMemo } from 'react';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';

import { AppLoader } from '../../app-loader';
import { AppTableColumn } from '../app-table.types';
import { AppTableRow } from '../app-table-row';
import { useAppTableStyles } from '../use-app-table-styles';

interface AppTableBodyProps {
  keyField: string;
  columns: AppTableColumn[];
  loading: boolean;
  data: any[];
  isFilterActive?: boolean;
}

export const AppTableTbody = memo(
  ({
    columns,
    keyField,
    data,
    loading,
    isFilterActive = false,
  }: AppTableBodyProps) => {
    const classes = useAppTableStyles();

    const renderRow = useCallback(
      (rowData, rowIndex) => {
        const rowKeyField = get(rowData, keyField, rowIndex);

        return (
          <AppTableRow key={rowKeyField} {...{ columns }} data={rowData} />
        );
      },
      [columns, keyField],
    );

    const noDataMessage = useMemo(() => {
      if (isEmpty(data) && isFilterActive) {
        return (
          <Typography variant='subtitle1' className={classes.noData}>
            Немає даних
          </Typography>
        );
      }

      return (
        <Typography variant='subtitle1' className={classes.noData}>
          Немає даних
        </Typography>
      );
    }, [data, isFilterActive, classes.noData]);

    const renderPlaceholderRow = useCallback(
      (content) => (
        <TableRow>
          <TableCell colSpan={columns.length} className={classes.bodyCell}>
            {content}
          </TableCell>
        </TableRow>
      ),
      [classes.bodyCell, columns.length],
    );

    const renderData = useCallback(() => {
      if (loading) {
        return renderPlaceholderRow(<AppLoader />);
      }
      if (data && !data.length && !loading) {
        return renderPlaceholderRow(noDataMessage);
      }
      return data.map(renderRow);
    }, [data, loading, noDataMessage, renderPlaceholderRow, renderRow]);

    return <TableBody>{renderData()}</TableBody>;
  },
);
