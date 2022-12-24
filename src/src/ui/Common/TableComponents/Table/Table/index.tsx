import React from 'react';
import TableMaterial from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import {NoData} from '../../../SimpleComponents/NoData';
import {TableBody} from '../TableBody';
import {TableHeader} from '../TableHeader';
import {TCustomRowRender, TRowActions} from '../TableRow';
import {TablePagination} from '../TablePagination';
import {LoaderWithBackdrop} from '../../../SimpleComponents/LoaderWithBackdrop';
import moment from 'moment';
import {SortDirection} from '@material-ui/core';
import './index.less';

export interface ITableProps<T> {
  data: Array<TRowActions<T>>;
  config: {[key in keyof T]?: ITableColumn<T>};
  customRowRender?: TCustomRowRender<T>;
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
  emptyInfo?: {
    icon: JSX.Element;
    message?: string;
    button?: JSX.Element;
  };
  loading?: boolean;
  pagination?: boolean;
  total?: number;
  className?: string;
  padding?: boolean;
  paddingTop?: boolean;
  onSortCallback?: (
    sortedData: T[],
    sortColumnName: keyof T,
    direction: TableSortDirection
  ) => void;
}
export interface ITableColumn<T> {
  label: string | JSX.Element;
  wrapper?: (data?: any, row?: T) => any;
  className?: string;
  align?: 'inherit' | 'left' | 'center' | 'right' | 'justify';
  sorting?: (data: T[], dir: TableSortDirection, sortColumn?: keyof T) => T[];
}

export type TableSortDirection = 'asc' | 'desc';

export const Table = <T,>({
  data = [],
  config,
  customRowRender,
  onRowClick,
  checkBox,
  actions,
  emptyInfo,
  loading,
  pagination,
  total,
  className,
  padding = true,
  paddingTop,
  onSortCallback,
}: ITableProps<T>) => {
  const cls = ['table'];
  if (padding) cls.push('table_padding');
  if (paddingTop) cls.push('table_padding_top');
  if (className) cls.push(className);
  return (
    <div className={cls.join(' ')}>
      {Array.isArray(data) && data.length > 0 ? (
        <React.Fragment>
          <TableContainer className="table__container table__container-custom">
            <TableMaterial className="table__content" size="small">
              <TableHeader<T>
                config={config}
                checkBox={!!checkBox}
                actionTitle={actions?.title}
                sortable={!!onSortCallback}
                onSortColumn={(sortColumn, direction) => {
                  let sortedData: T[];
                  const sortingFn = config[sortColumn]?.sorting;
                  if (sortingFn) {
                    sortedData = sortingFn(data.slice(), direction, sortColumn);
                  } else {
                    sortedData = defaultSortingFn(data, sortColumn, direction);
                  }
                  onSortCallback?.(sortedData, sortColumn, direction);
                }}
              />
              <TableBody<T>
                loading={loading}
                onRowClick={onRowClick}
                data={data}
                config={config}
                customRowRender={customRowRender}
                checkBox={checkBox}
                actions={actions}
              />
            </TableMaterial>
          </TableContainer>
          {pagination ? <TablePagination count={total} /> : null}
        </React.Fragment>
      ) : loading ? (
        <LoaderWithBackdrop loading={loading} />
      ) : (
        <NoData
          icon={emptyInfo?.icon}
          message={emptyInfo?.message || 'Нет данных для отображения'}
          reloadButton={emptyInfo?.button}
        />
      )}
    </div>
  );
};

const getSortedType = (value: any): 'number' | 'string' | 'Date' => {
  if (moment(value, 'DD.MM.YYYY').isValid()) {
    return 'Date';
  }
  if (!Number.isNaN(Number(value))) {
    return 'number';
  }

  return 'string';
};

const defaultSortingFn = <T,>(
  data: T[],
  sortColumn: keyof T,
  direction: SortDirection
) => {
  return data.slice().sort((a: T, b: T) => {
    const typleType = [
      getSortedType(a[sortColumn]),
      getSortedType(b[sortColumn]),
    ];

    switch (typleType[0] === typleType[1] ? typleType[0] : null) {
      case 'Date':
        if (direction === 'asc') {
          return moment(a[sortColumn], 'DD.MM.YYYY').toDate().getTime() >
            moment(b[sortColumn], 'DD.MM.YYYY').toDate().getTime()
            ? 1
            : -1;
        } else {
          return moment(a[sortColumn], 'DD.MM.YYYY').toDate().getTime() <
            moment(b[sortColumn], 'DD.MM.YYYY').toDate().getTime()
            ? 1
            : -1;
        }
      case 'number':
        if (direction === 'asc') {
          return Number(a[sortColumn]) > Number(b[sortColumn]) ? 1 : -1;
        } else {
          return Number(a[sortColumn]) < Number(b[sortColumn]) ? 1 : -1;
        }
      default:
        if (direction === 'asc') {
          return a[sortColumn] > b[sortColumn] ? 1 : -1;
        } else {
          return a[sortColumn] < b[sortColumn] ? 1 : -1;
        }
    }
  });
};
