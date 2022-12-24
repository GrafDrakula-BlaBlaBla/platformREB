import React, {useState} from 'react';
import {Collapse, TableCell, TableRow} from '@material-ui/core';
import {ITableColumn} from '../../../../Common/TableComponents';
import {ClassNameInjection} from '../../../../../Utils/ClassNames/ClassNameInjection';
import './index.less';

export interface IReportDealColumnCollapse<T> extends ITableColumn<T> {
  noToggle?: boolean;
}
interface IReportDealRowCollapseRow<T> {
  row: T;
  columns: {[key in keyof T]?: IReportDealColumnCollapse<T>};
  collapseContent: JSX.Element;
  onRemove?: (TInstance: T) => void;
}
export const ReportDealRowCollapse = <T,>({
  row,
  columns,
  collapseContent,
}: IReportDealRowCollapseRow<T>) => {
  const [isOpen, setIsOpen] = useState(false);

  const clsRow = ClassNameInjection('report-deal-row', {
    'report-deal-row_open': isOpen,
  });
  const clsRowCollapse = ClassNameInjection('report-deal-row__collapse', {
    'report-deal-row__collapse_open': isOpen,
  });

  return (
    <React.Fragment>
      <TableRow className={clsRow}>
        {Object.keys(columns).map((dataKey, index) => {
          const col = columns[dataKey as keyof typeof columns];
          const wrapper = col?.wrapper;
          const key = dataKey as keyof T;
          const content = wrapper ? wrapper(row[key], row) : row[key];
          return (
            <TableCell
              align={col?.align}
              key={index}
              className="report-deal-row__cell"
              onClick={() => setIsOpen(!isOpen)}
            >
              <div className="report-deal-row__cell-content">{content}</div>
            </TableCell>
          );
        })}
      </TableRow>
      <TableRow className={clsRowCollapse}>
        <TableCell className="report-deal-row__cell" colSpan={5}>
          <Collapse
            className="report-deal-row__layout"
            in={isOpen}
            timeout="auto"
            unmountOnExit
          >
            <div className="report-deal-row__content">{collapseContent}</div>
            <div className="report-deal-row__footer">
              <div className="link" onClick={() => setIsOpen(false)}>
                Скрыть детали
              </div>
            </div>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};
