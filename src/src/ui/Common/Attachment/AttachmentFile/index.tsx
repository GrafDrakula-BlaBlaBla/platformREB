import React from 'react';
import {observer} from 'mobx-react-lite';
import {IAttachmentDTO} from '../../../../Model/Attachment';
import {AttachmentDropZone} from '../AttachmentDropZone';
import {AttachmentTable} from '../AttachmentTable';
import {DropzoneOptions} from 'react-dropzone';
import {AttachmentTableSkeleton} from '../AttachmentTableSkeleton';
import {LoaderWithBackdrop} from '../../SimpleComponents/LoaderWithBackdrop';
import {AttachmentDropZoneSkeleton} from '../AttachmentDropZoneSkeleton';
import './index.less';

interface IAttachmentFileProps {
  loading?: boolean;
  isDownload?: boolean;
  isDownloadAll?: boolean;
  isUpload?: boolean;
  isRemove?: boolean;
  isHeaderHidden?: boolean;
  pagination?: boolean;
  total?: number;
  attachments?: IAttachmentDTO[];
  handleUpload?: (files: File[]) => void;
  handleRemove?: (id: string) => void;
  handleDownload?: (ids: string[]) => void;
  handleDownloadAll?: () => void;
  dropZoneOptions?: DropzoneOptions;
  emptyTableInfo?: JSX.Element;
}

export const AttachmentFile = observer((props: IAttachmentFileProps) => {
  const {
    attachments,
    loading,
    handleUpload,
    handleRemove,
    handleDownload,
    handleDownloadAll,
    dropZoneOptions,
    emptyTableInfo,
    isDownload,
    isDownloadAll,
    isUpload,
    isRemove,
    isHeaderHidden,
    pagination,
    total,
  } = props;

  return !Number.isInteger(total) && loading ? (
    <div className="attachment-file">
      {isUpload && <AttachmentDropZoneSkeleton />}
      <AttachmentTableSkeleton isRemove={isRemove} />
    </div>
  ) : (
    <div className="attachment-file">
      <LoaderWithBackdrop loading={loading} />
      {isUpload && (
        <AttachmentDropZone options={dropZoneOptions} onUpload={handleUpload} />
      )}
      {Number(total) > 0 ? (
        <AttachmentTable
          attachments={attachments || []}
          onDownload={handleDownload}
          onDownloadAll={handleDownloadAll}
          onRemove={handleRemove}
          isDownload={isDownload}
          isDownloadAll={isDownloadAll}
          isRemove={isRemove}
          isHeaderHidden={isHeaderHidden}
          pagination={pagination}
          total={total}
        />
      ) : (
        emptyTableInfo
      )}
    </div>
  );
});
