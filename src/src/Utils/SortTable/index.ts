import {TableSortDirection} from '../../ui/Common/TableComponents';

export function getSortQuery<T>(
  columnName: keyof T,
  direction: TableSortDirection
): string {
  if (columnName && direction) return `${direction}(${columnName})`;
  return '';
}
