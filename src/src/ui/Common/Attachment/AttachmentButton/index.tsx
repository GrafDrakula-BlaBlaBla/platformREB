import React from 'react';
import {Button} from '../../SimpleComponents/Button';
import '../AttachmentDropZone/index.less';

export const AttachmentButton = () => {
  return (
    <div className="attachment-button">
      <Button className="button" variant="outlined" color="default">
        Выбрать файлы
      </Button>
    </div>
  );
};
