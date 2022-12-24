import React from 'react';
import {statusSelectParams} from '../Configs';
import {
  TableFilter,
  TableFilterDateInterval,
  TableFilterSelect,
} from '../../../../Common/TableComponents';

export const TableReportsFilters = () => (
  <TableFilter>
    <TableFilterSelect {...statusSelectParams} />
    <TableFilterDateInterval nameYearStart="startDate" nameYearEnd="endDate" />
  </TableFilter>
);
