import React from 'react';
import {ModalPage} from '../ModalPage';
import {PDFViewer} from '../PDFViewer';
import './index.less';

interface IPDFDialogProps {
  fileName: string;
  isOpen: boolean;
  onClose: () => void;
  title: string;
}

export const PDFDialog = (props: IPDFDialogProps) => {
  const {fileName, isOpen, onClose, title} = props;

  return (
    <ModalPage
      fullScreen={true}
      isOpen={isOpen}
      onClose={onClose}
      header={{title: title}}
      className="pdf-dialog"
    >
      <PDFViewer fileName={fileName} />
    </ModalPage>
  );
};
