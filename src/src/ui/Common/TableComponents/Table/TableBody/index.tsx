import React from 'react';
import TableBody from '@material-ui/core/TableBody';
import {
  TableBodyRow,
  TableBodyRowSkeleton,
  TCustomRowRender,
} from '../TableRow';
import {ITableColumn} from '../Table';

const Body = <T,>({
  data,
  config,
  customRowRender,
  onRowClick,
  checkBox,
  actions,
  loading,
}: {
  data: Array<T>;
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
  loading?: boolean;
}) => {
  if (loading) {
    return (
      <TableBody>
        {skeletonRowRenderer(config, data, checkBox, actions)}
      </TableBody>
    );
  }
  if (customRowRender) {
    return <TableBody>{customRowRender(data, config)}</TableBody>;
  }
  return (
    <TableBody>
      {defaultRowRender(config, data, onRowClick, checkBox, actions, loading)}
    </TableBody>
  );
};

const skeletonRowRenderer = <T,>(
  config: {[key in keyof T]?: ITableColumn<T>},
  data: Array<T> = [],
  checkBox?: {
    checkBoxHandler: (e: React.ChangeEvent<HTMLInputElement>, row: T) => void;
  },
  actions?: {
    title: string;
    isActive?: boolean;
    edit?: (e: React.MouseEvent<Element, MouseEvent>, row: T) => void;
    delete?: (e: React.MouseEvent<Element, MouseEvent>, row: T) => void;
  }
) => {
  return data.map((row, index) => (
    <TableBodyRowSkeleton<T>
      key={index}
      row={row}
      columns={config}
      checkBox={checkBox}
      actions={actions}
    />
  ));
};

const defaultRowRender = <T,>(
  config: {[key in keyof T]?: ITableColumn<T>},
  data: Array<T> = [],
  onRowClick?: (row: T) => void,
  checkBox?: {
    checkBoxHandler: (e: React.ChangeEvent<HTMLInputElement>, row: T) => void;
  },
  actions?: {
    title: string;
    isActive?: boolean;
    edit?: (e: React.MouseEvent<Element, MouseEvent>, row: T) => void;
    delete?: (e: React.MouseEvent<Element, MouseEvent>, row: T) => void;
  },
  loading?: boolean
) => {
  return data.map((row, index) => (
    <TableBodyRow<T>
      loading={loading}
      onRowClick={onRowClick}
      key={index}
      columns={config}
      row={row}
      checkBox={checkBox}
      actions={actions}
    />
  ));
};

export {Body as TableBody};
