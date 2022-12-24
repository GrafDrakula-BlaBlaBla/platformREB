import React from 'react';
import {statusSelectParams} from '../Config';
import {
  TableFilter,
  TableFilterDateInterval,
  TableFilterSelect,
} from '../../../../Common/TableComponents';

export const TableRegistersFilters = () => (
  <TableFilter>
    <TableFilterSelect {...statusSelectParams} />
    <TableFilterDateInterval nameYearStart="startDate" nameYearEnd="endDate" />
  </TableFilter>
);
