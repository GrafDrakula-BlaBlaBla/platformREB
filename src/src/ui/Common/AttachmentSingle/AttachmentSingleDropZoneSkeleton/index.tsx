import React from 'react';
import {ReactComponent as AttachmentFile} from '../../../../assets/svg/attachment/AttachmentFile.svg';
import {Skeleton} from '@material-ui/lab';
import InfoIcon from '@material-ui/icons/Info';

export const AttachmentSingleDropZoneSkeleton = () => {
  return (
    <div className="attachment-single-drop-zone">
      <AttachmentFile />
      <div className="attachment-single-drop-zone__main-text">
        <Skeleton width={250} height={18} />
      </div>
      <InfoIcon />
    </div>
  );
};
