import TableRow from '@material-ui/core/TableRow';
import React, { memo, useCallback } from 'react';

import { AppTableColumn } from '../app-table.types';
import { AppTableTheadCell } from '../app-table-thead-cell';

type CustomTableTheadProps = {
  columns: AppTableColumn[];
};

export const AppTableThead = memo(({ columns }: CustomTableTheadProps) => {
  const renderCell = useCallback(
    (column, index) => (
      <AppTableTheadCell
        key={index}
        {...{
          column,
        }}
      />
    ),
    [],
  );

  return (
    <thead>
      <TableRow>{columns.map(renderCell)}</TableRow>
    </thead>
  );
});
