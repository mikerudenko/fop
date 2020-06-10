import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import React, { memo } from 'react';

import { AppTableColumn } from './app-table.types';
// import { AppTablePagination } from './app-table-pagination';
import { AppTableTbody } from './app-table-tbody';
import { AppTableThead } from './app-table-thead';
import { useAppTableStyles } from './use-app-table-styles';

interface AppTableProps {
  columns: AppTableColumn[];
  keyField: string;
  data: any[];
  loading: boolean;
}

export const AppTable = memo(
  ({ columns, keyField, data, loading }: AppTableProps) => {
    const classes = useAppTableStyles();

    return (
      <Paper className={classes.root}>
        <div className={classes.tableWrapper}>
          <Table stickyHeader>
            <AppTableThead columns={columns} />
            <AppTableTbody
              {...{
                keyField,
                loading,
                columns,
                data,
              }}
            />
          </Table>
        </div>
        {/* <AppTablePagination /> */}
      </Paper>
    );
  },
);
