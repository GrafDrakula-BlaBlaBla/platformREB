import React from 'react';
import {Skeleton} from '@material-ui/lab';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';

export interface IAttachmentTableSkeletonProps {
  isRemove?: boolean;
}
export const AttachmentTableSkeleton = (
  props: IAttachmentTableSkeletonProps
) => {
  const {isRemove} = props;
  return (
    <div className="attachment-table">
      <TableContainer>
        <Table className="attachment-table__wrap" size="small">
          <TableHead>
            <TableRow>
              <TableCell align="left">Наименование документа</TableCell>
              <TableCell align="right">Дата загрузки</TableCell>
              <TableCell align="right">Размер</TableCell>
              {isRemove && <TableCell align="right">Действия</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.apply(null, Array(2)).map((i, index) => (
              <TableRow key={index}>
                <TableCell align="left">
                  <Skeleton />
                </TableCell>
                <TableCell align="right">
                  <Skeleton />
                </TableCell>
                <TableCell align="right">
                  <Skeleton />
                </TableCell>
                {isRemove && (
                  <TableCell align="right">
                    <Skeleton />
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
