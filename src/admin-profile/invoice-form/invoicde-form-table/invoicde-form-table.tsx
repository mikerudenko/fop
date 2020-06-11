import React, { memo, useCallback } from 'react';

export const InvoicdeFormTable = memo(() => {

  const renderTableRow = useCallback(() => {

  }, [])


  return (
    <table>
      <thead>
        <tr>
          <th>№</th>
          <th>Код</th>
          <th>Назва</th>
          <th>Ціна</th>
          <th>Кількість</th>
          <th>Сумма</th>
          <th></th>
        </tr>
      </thead>
    </table>
  );
});
