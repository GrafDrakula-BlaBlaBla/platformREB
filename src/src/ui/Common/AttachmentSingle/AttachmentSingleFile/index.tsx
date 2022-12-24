import React from 'react';
import fileSize from 'filesize';
import {ReactComponent as AttachmentFile} from '../../../../assets/svg/attachment/AttachmentFile.svg';
import {ReactComponent as DownloadIcon2} from '../../../../assets/svg/attachment/DownloadIcon2.svg';
import {IAttachmentSingleDTO} from '../../../../Model/Attachment';
import {DropzoneOptions} from 'react-dropzone';
import {AttachmentSingleDropZone} from '../AttachmentSingleDropZone';
import {AttachmentSingleDropZoneSkeleton} from '../AttachmentSingleDropZoneSkeleton';
import CloseIcon from '@material-ui/icons/Close';
import {ClassNameInjection} from '../../../../Utils/ClassNames/ClassNameInjection';
import './index.less';

export interface IAttachmentSingleFileProps {
  loading?: boolean;
  isDownload?: boolean;
  isUpload?: boolean;
  isRemove?: boolean;
  attachment?: IAttachmentSingleDTO;
  handleUpload?: (files: File[]) => void;
  handleRemove?: (id: string) => void;
  handleDownload?: (id: string) => void;
  dropZoneOptions?: DropzoneOptions;
}

export const AttachmentSingleFile = (props: IAttachmentSingleFileProps) => {
  const {
    loading,
    isDownload,
    isUpload,
    isRemove,
    attachment,
    handleUpload,
    handleRemove,
    handleDownload,
    dropZoneOptions,
  } = props;

  const cls = ClassNameInjection(
    'attachment-single-file',
    isDownload ? 'attachment-single-file_is-download' : undefined,
    isRemove ? 'attachment-single-file_is-remove' : undefined
  );

  const onDownload = (data: IAttachmentSingleDTO) => {
    if (isDownload && handleDownload) handleDownload(data.id);
  };
  const onRemove = (
    data: IAttachmentSingleDTO,
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation();
    if (isRemove && handleRemove) handleRemove(data.id);
  };

  return loading ? (
    <AttachmentSingleDropZoneSkeleton />
  ) : !attachment ? (
    isUpload ? (
      <AttachmentSingleDropZone
        options={dropZoneOptions}
        onUpload={handleUpload}
      />
    ) : (
      <div className="attachment-single-file__no-data">Нет данных</div>
    )
  ) : (
    <div onClick={() => onDownload(attachment)} className={cls}>
      <div className="attachment-single-file__icon">
        <AttachmentFile />
      </div>
      <div className="attachment-single-file__info">
        <div className="attachment-single-file__name">
          {attachment?.attachmentName}
        </div>
        <div className="attachment-single-file__size">
          {fileSize(Number(attachment?.attachmentSize))}
        </div>
      </div>
      <div className="attachment-single-file__buttons">
        {isRemove && (
          <div
            className="attachment-single-file__remove"
            onClick={(e) => onRemove(attachment, e)}
          >
            <CloseIcon />{' '}
          </div>
        )}
        {!isRemove && isDownload && (
          <div className="attachment-single-file__download">
            <DownloadIcon2 />
          </div>
        )}
      </div>
    </div>
  );
};
