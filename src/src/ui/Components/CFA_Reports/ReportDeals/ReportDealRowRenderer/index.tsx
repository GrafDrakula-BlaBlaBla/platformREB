import React from 'react';
import {ICFA_ReportDealDTO} from '../../../../../Model/CFA_Reports';
import {ReportDealDetails} from '../ReportDealDetails';
import {TCustomRowRender} from '../../../../Common/TableComponents';
import {
  IReportDealColumnCollapse,
  ReportDealRowCollapse,
} from '../ReportDealRowCollapse';
import {TReportDealsType} from '../index';

export const ReportDealRowRenderer = (
  type: TReportDealsType
): TCustomRowRender<ICFA_ReportDealDTO> => (
  data: ICFA_ReportDealDTO[],
  columns: {
    [key in keyof ICFA_ReportDealDTO]?: IReportDealColumnCollapse<
      ICFA_ReportDealDTO
    >;
  }
): Array<JSX.Element> => {
  return data.map((row, index) => (
    <ReportDealRowCollapse
      key={row.id}
      row={row}
      columns={columns}
      collapseContent={
        <ReportDealDetails key={row.id} data={row} type={type} />
      }
    />
  ));
};
