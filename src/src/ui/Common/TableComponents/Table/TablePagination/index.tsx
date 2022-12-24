import React from 'react';
import {TablePagination as MuiTablePagination} from '@material-ui/core';
import {useFilters} from '../../../../hooks/useFilters';
import {useRoute} from 'react-router5';
import './index.less';
import {observer} from 'mobx-react-lite';

const ROWS_PER_PAGE_OPTIONS = [2, 5, 10, 20];

export interface ITablePaginationProps {
  count?: number;
}

export const TablePagination = observer((props: ITablePaginationProps) => {
  const {count} = props;
  const {route} = useRoute();

  const {filters, setFilter} = useFilters();
  const handleChangePage = (_: unknown, newPage: number) => {
    setFilter(
      'offset',
      convertPageToOffset(filters.limit, newPage + 1),
      route.name
    );
  };
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFilter('limit', event.target.value, route.name);
  };

  return (
    <div className="table-pagination">
      <MuiTablePagination
        rowsPerPageOptions={ROWS_PER_PAGE_OPTIONS}
        component="div"
        count={count || 0}
        rowsPerPage={+filters.limit || 2}
        page={convertOffsetToPage(filters.limit, filters.offset)}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
        labelRowsPerPage="Строк на странице"
        labelDisplayedRows={({from, to, count}) =>
          `${from}-${to} из ${count !== -1 ? count : `больше чем ${to}`}`
        }
        nextIconButtonProps={{size: 'small'}}
        backIconButtonProps={{size: 'small'}}
        nextIconButtonText="Следующая страница"
        backIconButtonText="Предидущая страница"
      />
    </div>
  );
});

function convertPageToOffset(limit: number, page: number): number {
  return (page - 1) * limit;
}
function convertOffsetToPage(limit: number, offset: number): number {
  return offset / limit;
}
