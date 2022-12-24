import React from 'react';
import {Delete, Edit} from '@material-ui/icons';
import {ITableColumn} from '../Table';
import {NoIcon} from '../../../Icons/NoIcon';
import {Skeleton} from '@material-ui/lab';
import {TableRow as Row, TableCell} from '@material-ui/core';
import './index.less';

export interface ITableBodyRowProps<T> {
  columns: {[key in keyof T]?: ITableColumn<T>};
  row: TRowActions<T>;
  onRowClick?: (row: T) => void;
  checkBox?: {
    checkBoxHandler: (e: React.ChangeEvent<HTMLInputElement>, row: T) => void;
  };
  actions?: {
    title: string;
    isActive?: boolean;
    edit?: (e: React.MouseEvent<Element, MouseEvent>, row: T) => void;
    delete?: (e: React.MouseEvent<Element, MouseEvent>, row: T) => void;
  };
  loading?: boolean;
}

export type TRowActions<T> = T & {rowEdit?: boolean; rowDelete?: boolean};

export type TCustomRowRender<T> = (
  data: Array<T>,
  columns: {[key in keyof T]?: ITableColumn<T>}
) => Array<JSX.Element>;

export const TableBodyRowSkeleton = <T,>({
  columns,
  checkBox,
  actions,
}: ITableBodyRowProps<T>) => {
  return (
    <Row className="table-row">
      {checkBox ? (
        <TableCell className="table-row__cell">
          <Skeleton variant="text" animation="wave" />
        </TableCell>
      ) : null}
      {Object.keys(columns).map((dataKey, index) => (
        <TableCell key={index} className="table-row__cell">
          <Skeleton variant="text" animation="wave" />
          <Skeleton variant="text" width="50%" animation="wave" />
        </TableCell>
      ))}
      {actions ? (
        <TableCell className="table-row__cell">
          <Skeleton variant="text" animation="wave" />
        </TableCell>
      ) : null}
    </Row>
  );
};

export const TableBodyRow = <T,>({
  row,
  columns,
  onRowClick,
  checkBox,
  actions,
  loading,
}: ITableBodyRowProps<T>) => {
  const handleClick = () => {
    if (!loading) onRowClick?.(row);
  };

  const rowClassName = ['table-row'];
  if (!onRowClick) rowClassName.push('table-row_cursor_default');

  return (
    <Row onClick={handleClick} className={rowClassName.join(' ')}>
      {checkBox ? (
        <TableCell className="table-row__cell">
          <input
            onClick={(e: React.MouseEvent<HTMLInputElement>) => {
              e.stopPropagation();
            }}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              if (!e.target.checked) {
                const headCheckBox = document.getElementById(
                  'head-checkbox'
                ) as HTMLInputElement;
                headCheckBox.checked = false;
              }
              checkBox.checkBoxHandler?.(e, row);
            }}
            className="table__checkbox"
            type="checkbox"
          />
        </TableCell>
      ) : null}
      {Object.keys(columns).map((dataKey, index) => {
        const wrapper = columns[dataKey as keyof typeof columns]?.wrapper;
        const key = dataKey as keyof T;
        const content = wrapper ? wrapper(row[key], row) : row[key];
        return (
          <TableCell
            align={columns[dataKey as keyof typeof columns]?.align}
            key={index}
            className="table-row__cell"
          >
            {content}
          </TableCell>
        );
      })}
      {actions ? (
        <TableCell
          className="table-row__cell table-row__cell_no-wrap"
          align="right"
        >
          <div className="table-row__cell_actions">
            {actions.edit && row.rowEdit ? (
              <Edit
                className={`edit ${actions.isActive ? '' : 'no-active'}`}
                onClick={(e: React.MouseEvent<Element, MouseEvent>) => {
                  e.stopPropagation();
                  if (actions.isActive) {
                    actions.edit?.(e, row);
                  }
                }}
              />
            ) : (
              <NoIcon />
            )}
            {actions.delete && row.rowDelete ? (
              <Delete
                className={`delete ${actions.isActive ? '' : 'no-active'}`}
                onClick={(e: React.MouseEvent<Element, MouseEvent>) => {
                  e.stopPropagation();
                  if (actions.isActive) {
                    actions.delete?.(e, row);
                  }
                }}
              />
            ) : (
              <NoIcon />
            )}
          </div>
        </TableCell>
      ) : null}
    </Row>
  );
};

export function TypeToTableRowMap<T>(
  t: T[],
  fn: (value: TRowActions<T>, index: number, array: T[]) => T
): Array<T & {rowEdit?: boolean; rowDelete?: boolean}> {
  return t.map(fn);
}
