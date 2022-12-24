import React, {useState} from 'react';
import {Collapse, TableCell, TableRow} from '@material-ui/core';
import {ITableColumn} from '../../Common/TableComponents';
import './TableCollapseRow.less';

export interface ITableCollapseColumn<T> extends ITableColumn<T> {
  noToggle?: boolean;
}

interface ITableCollapseRow<T> {
  row: T;
  columns: {[key in keyof T]?: ITableCollapseColumn<T>};
  collapseContent: JSX.Element;
  onRowClick?: (
    e: React.MouseEvent<HTMLTableRowElement, MouseEvent>,
    row: T
  ) => void;
  onRemove?: (TInstance: T) => void;
}

//@todo: вынести в отельные компонент
//@todo: проработать компонент

export const TableCollapseRow = <T,>({
  row,
  columns,
  collapseContent,
  onRemove,
  onRowClick,
}: ITableCollapseRow<T>) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLTableRowElement, MouseEvent>) =>
    onRowClick?.(e, row);

  const cls = ['table-row', isOpen ? 'Open' : 'Close'];
  const clsContent = ['table-row', isOpen ? 'openContent' : 'closeContent'];

  return (
    <>
      <TableRow
        className={cls.join(' ')}
        onClick={(e: React.MouseEvent<HTMLTableRowElement, MouseEvent>) => {
          handleClick(e);
        }}
      >
        {Object.keys(columns).map((dataKey, index) => {
          const col = columns[dataKey as keyof typeof columns];
          const wrapper = col?.wrapper;

          const key = dataKey as keyof T;
          const content = wrapper ? wrapper(row[key]) : row[key];

          return (
            <TableCell
              align={col?.align}
              key={index}
              className={[
                col?.className ? col?.className : '',
                'table-row__cell',
              ].join(' ')}
              onClick={() => {
                setIsOpen((isOpen) => !isOpen);
              }}
            >
              {content}
            </TableCell>
          );
        })}
      </TableRow>
      <TableRow className={clsContent.join(' ')}>
        <TableCell className="Content-CollapseWrapper" colSpan={9}>
          <Collapse
            className="Content-Collapse Collapse"
            in={isOpen}
            timeout="auto"
            unmountOnExit
          >
            {collapseContent}
            <div
              className={[
                'Collapse-Footer',
                onRemove ? 'Collapse-Footer_space-between' : '',
              ].join(' ')}
            >
              {onRemove ? (
                <button
                  className="Footer-Delete"
                  onClick={() => {
                    onRemove(row);
                  }}
                >
                  Удалить
                </button>
              ) : null}
              <div
                className="Footer-CollapsedButton link"
                onClick={() => {
                  setIsOpen(false);
                }}
              >
                Скрыть детали
              </div>
            </div>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};
