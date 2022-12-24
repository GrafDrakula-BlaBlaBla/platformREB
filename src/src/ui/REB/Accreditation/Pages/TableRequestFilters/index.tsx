import React from 'react';
import {statusSelectParams} from './config';
import {
  TableFilter,
  TableFilterSelect,
} from '../../../../Common/TableComponents';

export const TableRequestFilters = () => {
  return (
    <TableFilter>
      <TableFilterSelect {...statusSelectParams} />
    </TableFilter>
  );
};
