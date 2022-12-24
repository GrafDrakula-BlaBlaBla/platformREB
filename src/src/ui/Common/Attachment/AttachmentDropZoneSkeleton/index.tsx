import React from 'react';
import {ReactComponent as UploadFileIcon} from '../../../../assets/svg/attachment/UploadFileIcon.svg';
import {Skeleton} from '@material-ui/lab';

export const AttachmentDropZoneSkeleton = () => {
  return (
    <div className="attachment-drop-zone">
      <UploadFileIcon />
      <div className="attachment-drop-zone__main-text">
        <Skeleton width={200} height={18} />
        <Skeleton width={300} height={18} />
      </div>
      <div className="attachment-drop-zone__secondary-text">
        <Skeleton width={500} height={18} />
      </div>
      <div className="attachment-button">
        <Skeleton width={250} height={52} />
      </div>
    </div>
  );
};
