import React from 'react';

interface IPDFViewerProps {
  fileName: string;
}

export const PDFViewer = ({fileName}: IPDFViewerProps) => {
  const url = `./pdf/${fileName}`;

  return (
    <object data={url} type="application/pdf">
      <embed src={url} type="application/pdf" />
    </object>
  );
};
