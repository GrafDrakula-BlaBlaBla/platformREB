import React, {useCallback} from 'react';
import {DropzoneOptions, useDropzone} from 'react-dropzone';
import {ReactComponent as AttachmentFile} from '../../../../assets/svg/attachment/AttachmentFile.svg';
import InfoIcon from '@material-ui/icons/Info';
import {createStyles, makeStyles, Tooltip} from '@material-ui/core';
import Fade from '@material-ui/core/Fade';
import './index.less';

interface IAttachmentSingleDropZoneProps {
  loading?: boolean;
  onUpload?: (files: File[]) => void;
  options?: DropzoneOptions;
}

const useStyles = makeStyles(() =>
  createStyles({
    tooltip: {
      maxWidth: 280,
      backgroundColor: '#565B63',
      fontSize: '14px',
      padding: '16px',
      textAlign: 'left',
      marginLeft: '-40px',
      marginBottom: '7px',
      borderRadius: '6px',
    },
  })
);

export const AttachmentSingleDropZone = ({
  loading,
  onUpload,
  options,
}: IAttachmentSingleDropZoneProps) => {
  const cssTooltip = useStyles();

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
  const cls = ['attachment-single-drop-zone'];
  if (isDragActive) cls.push('attachment-single-drop-zone_drag-active');

  return (
    <div className={cls.join(' ')} {...getRootProps()}>
      <AttachmentFile />
      <div className="attachment-single-drop-zone__main-text">
        Перетащите файл или нажмите здесь
      </div>
      <Tooltip
        title="Размер одного файла до 150 Мб. Допустимые форматы: pdf, doc, docx."
        placement="top-start"
        TransitionProps={{timeout: 400}}
        TransitionComponent={Fade}
        classes={{
          tooltip: cssTooltip.tooltip,
        }}
      >
        <InfoIcon />
      </Tooltip>
      <input {...getInputProps()} />
    </div>
  );
};
