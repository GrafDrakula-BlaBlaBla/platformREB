import React from 'react';
import {statusSelectParams} from '../Config';
import {
  TableFilter,
  TableFilterSelect,
} from '../../../../Common/TableComponents';

export const TableCreditsFilters = () => (
  <TableFilter>
    <TableFilterSelect {...statusSelectParams} />
  </TableFilter>
);
