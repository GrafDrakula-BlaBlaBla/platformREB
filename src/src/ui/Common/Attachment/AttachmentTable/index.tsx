import React, {useEffect, useState} from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import {ReactComponent as BasketIcon} from '../../../../assets/svg/attachment/BasketIcon.svg';
import {EAttachmentStatus, IAttachmentDTO} from '../../../../Model/Attachment';
import {getDateWithFrontEndFormat} from '../../../../Utils/Date/DateFormat';
import {CheckboxFieldControl} from '../../FieldControls';
import {useTableCheckbox} from '../../../hooks/useTableCheckbox';
import {Button} from '../../SimpleComponents/Button';
import ReplayIcon from '@material-ui/icons/Replay';
import {TablePagination} from '../../TableComponents/Table/TablePagination';
import './index.less';

interface IAttachmentTableProps {
  attachments: Array<IAttachmentDTO>;
  isDownload?: boolean;
  isDownloadAll?: boolean;
  isRemove?: boolean;
  isHeaderHidden?: boolean;
  pagination?: boolean;
  total?: number;
  onRemove?: (id: string) => void;
  onDownload?: (ids: string[]) => void;
  onDownloadAll?: () => void;
}

export const AttachmentTable = ({
  attachments,
  isDownload,
  isDownloadAll,
  isRemove,
  isHeaderHidden,
  pagination,
  total,
  onRemove,
  onDownload,
  onDownloadAll,
}: IAttachmentTableProps) => {
  const {
    checkedIds,
    onCheckAll,
    onCheck,
    checkAllValue,
    checkAllIndeterminate,
  } = useTableCheckbox<IAttachmentDTO>(attachments);
  // @todo: работу с чекбоксами вынести в общий компонент таблицы

  useEffect(() => {
    onCheckAll(false);
    // eslint-disable-next-line
  }, [attachments]);

  const [showAll, setShowAll] = useState<boolean>(false);
  const COUNT_ROWS = 5;

  const onDownloadSelected = () => {
    if (onDownload) onDownload(checkedIds);
  };

  const onDownloadRow = (row: IAttachmentDTO) => {
    if (onDownload) onDownload([row.id]);
  };

  const onRemoveRow = (row: IAttachmentDTO) => {
    if (onRemove) onRemove(row.id);
  };

  const onReloadRow = (row: IAttachmentDTO) => {
    console.log('reload file', row.id);
  };

  const cls = ['attachment-table'];
  if (isDownload) cls.push('attachment-table_is-download');
  if (isRemove) cls.push('attachment-table_is-remove');
  if (isHeaderHidden) cls.push('attachment-table_is-header-hidden');

  let footerButtonsColSpan = 3;
  if (isRemove) footerButtonsColSpan++;
  if (isDownload && checkedIds.length === 0) footerButtonsColSpan++;

  return (
    <div className={cls.join(' ')}>
      <TableContainer className="attachment-table__container">
        <Table className="attachment-table__wrap" size="small">
          {!isHeaderHidden && (
            <TableHead>
              <TableRow>
                {isDownload && (
                  <TableCell
                    align="left"
                    className="attachment-table__checkbox"
                  >
                    <CheckboxFieldControl
                      value={checkAllValue}
                      indeterminate={checkAllIndeterminate}
                      onChange={(_, checked) => onCheckAll(checked)}
                    />
                  </TableCell>
                )}
                <TableCell align="left">Наименование документа</TableCell>
                <TableCell align="right">Дата загрузки</TableCell>
                <TableCell align="right">Размер</TableCell>
                {isRemove && <TableCell align="right">Действия</TableCell>}
              </TableRow>
            </TableHead>
          )}
          <TableBody>
            {attachments.map((row, i) => {
              return pagination || showAll || (!showAll && i < COUNT_ROWS) ? (
                <TableRow key={row.id}>
                  {isDownload && (
                    <TableCell
                      align="left"
                      className="attachment-table__checkbox"
                    >
                      {!row.disabled ? (
                        <CheckboxFieldControl
                          value={checkedIds.indexOf(row.id) !== -1}
                          onChange={(_, checked) => onCheck(row.id, checked)}
                        />
                      ) : null}
                    </TableCell>
                  )}
                  <TableCell align="left">
                    <div className="attachment-table__filename">
                      {isDownload &&
                      (row.status === EAttachmentStatus.GET ||
                        row.status === EAttachmentStatus.SUCCESS) ? (
                        <span
                          onClick={() => onDownloadRow(row)}
                          className="link"
                        >
                          {row.attachmentName}
                        </span>
                      ) : (
                        <span>{row.attachmentName}</span>
                      )}
                      {row.status === EAttachmentStatus.SUCCESS ? (
                        <span className="attachment-table__filename_status color-green">
                          Файл загружен
                        </span>
                      ) : null}
                      {row.status === EAttachmentStatus.ERROR ? (
                        <span className="attachment-table__filename_status color-red">
                          Файл не загружен
                        </span>
                      ) : null}
                    </div>
                  </TableCell>
                  <TableCell align="right">
                    {getDateWithFrontEndFormat(row.attachmentDate)}
                  </TableCell>
                  <TableCell align="right">
                    {row.attachmentSizeString}
                  </TableCell>
                  {isRemove && (
                    <TableCell align="right">
                      <div className="attachment-table__actions">
                        {row.status === EAttachmentStatus.ERROR ? (
                          <ReplayIcon onClick={() => onReloadRow(row)} />
                        ) : null}
                        {!row.disabled && row.canDelete ? (
                          <BasketIcon onClick={() => onRemoveRow(row)} />
                        ) : null}
                      </div>
                    </TableCell>
                  )}
                </TableRow>
              ) : null;
            })}
            {isDownloadAll || (isDownload && checkedIds.length > 0) ? (
              <TableRow className="attachment-table__bottom">
                {isDownload && checkedIds.length > 0 && (
                  <TableCell className="attachment-table__checkbox">
                    <CheckboxFieldControl
                      value={!!checkedIds.length}
                      onChange={() => onCheckAll(false)}
                    />
                  </TableCell>
                )}
                <TableCell align="right" colSpan={footerButtonsColSpan}>
                  <div className="attachment-table__buttons">
                    <div className="attachment-table__buttons-left">
                      {isDownload &&
                        checkedIds.length > 0 &&
                        `Выбрано ${checkedIds.length}`}
                    </div>
                    <div className="attachment-table__buttons-right">
                      {isDownload && checkedIds.length > 0 && (
                        <Button
                          variant="outlined"
                          color="default"
                          size="small"
                          onClick={onDownloadSelected}
                        >
                          Скачать ({checkedIds.length})
                        </Button>
                      )}
                      {isDownloadAll && (
                        <Button
                          variant="contained"
                          color="blue"
                          size="small"
                          onClick={onDownloadAll}
                        >
                          Скачать все ({total})
                        </Button>
                      )}
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            ) : null}
          </TableBody>
        </Table>
      </TableContainer>
      {pagination ? (
        <TablePagination count={total} />
      ) : attachments.length > COUNT_ROWS ? (
        <Button
          whiteTheme
          className="attachment-table__button"
          onClick={() => setShowAll(!showAll)}
        >
          {showAll
            ? `Показать первые ${COUNT_ROWS} документов`
            : `Показать все документы (${attachments.length})`}
        </Button>
      ) : null}
    </div>
  );
};
