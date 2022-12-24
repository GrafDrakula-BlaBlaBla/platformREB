import React, {useState} from 'react';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import {ITableColumn} from '../Table';
import {TableSortLabel} from '@material-ui/core';
import {TableSortDirection} from '..';
import './index.less';

const Header = <T,>({
  config,
  checkBox,
  actionTitle,
  sortable,
  onSortColumn,
}: {
  config: {[key in keyof T]?: ITableColumn<T>};
  checkBox?: boolean;
  actionTitle?: string;
  sortable?: boolean;
  onSortColumn?: (columnName: keyof T, direction: TableSortDirection) => void;
}) => {
  const [order, setOrder] = useState<TableSortDirection>('asc');
  const [orderBy, setOrderBy] = useState<keyof T>(
    Object.keys(config)[0] as keyof T
  );

  const createSortHandler = (property: keyof T) => (
    event: React.MouseEvent<unknown>
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    const newOrder = isAsc ? 'desc' : 'asc';
    setOrder(newOrder);
    setOrderBy(property);
    onSortColumn?.(property, newOrder);
  };

  return (
    <TableHead className="table-header">
      <TableRow>
        {checkBox ? (
          <TableCell>
            <input
              id="head-checkbox"
              type="checkbox"
              className="table-header__cell table__checkbox"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const checked = e.target.checked;
                const checkboxes = document.getElementsByClassName(
                  'table__checkbox'
                ) as HTMLCollectionOf<HTMLInputElement>;

                for (let i = 0; i < checkboxes.length; i++) {
                  const checkbox = checkboxes[i] as HTMLInputElement;
                  if (checkbox.checked !== checked) {
                    checkbox.click();
                  }
                }
              }}
            />
          </TableCell>
        ) : null}
        {Object.keys(config).map((dataKey, i, arr) => {
          const conf = config[dataKey as keyof typeof config];
          return (
            <TableCell
              key={dataKey}
              align={conf?.align}
              className="table-header__cell"
              style={{width: `${100 / arr.length}%`}}
            >
              {sortable ? (
                <TableSortLabel
                  active={orderBy === dataKey || false}
                  direction={orderBy === dataKey ? order : 'asc'}
                  onClick={createSortHandler(dataKey as keyof T)}
                >
                  {conf?.label}
                </TableSortLabel>
              ) : (
                conf?.label
              )}
            </TableCell>
          );
        })}
        {actionTitle ? (
          <TableCell className="table-header__cell" align="right">
            {actionTitle}
          </TableCell>
        ) : null}
      </TableRow>
    </TableHead>
  );
};

export {Header as TableHeader};
