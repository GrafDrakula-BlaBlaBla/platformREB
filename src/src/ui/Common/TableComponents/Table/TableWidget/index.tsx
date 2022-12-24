import React from 'react';
import {Table} from '..';
import {ITableProps} from '../..';
import './index.less';

export const TableWidget = <T,>(props: ITableProps<T>) => {
  return (
    <div className="table-widget">
      <Table {...props} />
    </div>
  );
};
