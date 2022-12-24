import React from 'react';
import {statusSelectParams} from '../../../REB/CFA/Pages/config';
import {
  TableFilterReportDate,
  TableFilterSelect,
} from '../../../Common/TableComponents';
import './index.less';

export const CFAFilterReports = () => (
  <div className="cfa-filter-reports">
    <TableFilterSelect {...statusSelectParams} />
    <TableFilterReportDate
      nameQuarter="quarter"
      nameYearStart="yearStart"
      nameYearEnd="yearEnd"
    />
  </div>
);
