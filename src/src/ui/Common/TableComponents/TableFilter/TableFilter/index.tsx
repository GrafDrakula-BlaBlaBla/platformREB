import React from 'react';
import {FC} from 'react';
import {TableFilterSearch} from '../TableFilterSearch';
import {ClassNameInjection} from '../../../../../Utils/ClassNames/ClassNameInjection';
import './index.less';

interface IProps {
  searchControl?: boolean;
  padding?: boolean;
  className?: string;
}

export const TableFilter: FC<IProps> = (props) => {
  const {searchControl, padding = true, className, children} = props;
  const cls = ClassNameInjection(
    'table-filter',
    padding ? 'table-filter_padding' : undefined,
    className ? className : undefined
  );
  return (
    <div className={cls}>
      <div className="table-filter__left">{children}</div>
      {searchControl ? (
        <div className="table-filter__right">
          <TableFilterSearch name="query" />
        </div>
      ) : null}
    </div>
  );
};
