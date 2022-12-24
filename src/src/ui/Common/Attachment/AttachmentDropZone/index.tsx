import React, {useCallback} from 'react';
import {DropzoneOptions, useDropzone} from 'react-dropzone';
import {AttachmentButton} from '../AttachmentButton';
import {ReactComponent as UploadFileIcon} from '../../../../assets/svg/attachment/UploadFileIcon.svg';
import './index.less';

interface IAttachmentDropZoneProps {
  loading?: boolean;
  onUpload?: (files: File[]) => void;
  options?: DropzoneOptions;
}

export const AttachmentDropZone = ({
  loading,
  onUpload,
  options,
}: IAttachmentDropZoneProps) => {
  const onDrop = useCallback(
    (acceptedFiles: Array<File>) => {
      if (onUpload) {
        onUpload(acceptedFiles);
      }
    },
    [onUpload]
  );

  const {getRootProps, getInputProps, isDragActive} = useDropzone({
    onDrop,
    disabled: loading,
    ...options,
  });
  const cls = ['attachment-drop-zone'];
  if (isDragActive) cls.push('attachment-drop-zone_drag-active');

  return (
    <div className={cls.join(' ')} {...getRootProps()}>
      <UploadFileIcon />
      <div className="attachment-drop-zone__main-text">
        Перетащите файлы сюда
        <br />
        или выберите файлы на вашем компьютере
      </div>
      <div className="attachment-drop-zone__secondary-text">
        Размер одного файла до 150 Мб. Допустимые форматы: pdf, doc, docx, jpeg,
        png.
      </div>
      <AttachmentButton />
      <input {...getInputProps()} />
    </div>
  );
};
