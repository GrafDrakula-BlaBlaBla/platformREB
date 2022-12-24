import React from 'react';
import {ReactComponent as DownloadIcon} from '../../../../assets/svg/attachment/DownloadIcon.svg';
import './index.less';

interface IProps {
  id: string;
  data: {
    label: string;
    excel?: (id: string) => void;
    xml?: (id: string) => void;
    pdf?: (id: string) => void;
  }[];
}

/**
 * Компонент отображающий скачивание документа в разных форматах.
 */
export const FilesExportBlock = ({data, id}: IProps) => (
  <div className="file-export">
    {data.map((item, index) => {
      return (
        <div className="d-flex margin-bottom-4" key={item.label}>
          <DownloadIcon />
          <div>
            <div className="margin-bottom-2">{item.label}</div>
            <div>
              {item.excel && (
                <span
                  onClick={() => item.excel?.(id)}
                  className="download-item padding-right-2"
                >
                  Excel
                </span>
              )}
              {item.pdf && (
                <span className="download-item padding-right-2">Pdf</span>
              )}
              {item.xml && (
                <span className="download-item padding-right-2">Xml</span>
              )}
            </div>
          </div>
        </div>
      );
    })}
  </div>
);
