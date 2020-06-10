import TableCell from '@material-ui/core/TableCell';
import React, { memo } from 'react';

import { AppTableColumn } from '../app-table.types';

type AppTableTheadCellProps = {
  column: AppTableColumn;
};

export const AppTableTheadCell = memo(
  ({
    column: { dataField, label, minWidth, align, headerClasses },
  }: AppTableTheadCellProps) => {
    const style = { minWidth };

    return (
      <TableCell
        key={dataField}
        {...{
          style,
          align,
        }}
        className={headerClasses}
      >
        {label}
      </TableCell>
    );
  },
);
