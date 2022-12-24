import React from 'react';
import './index.less';

interface IProps {
  data: {label: string; value: string | JSX.Element | number | undefined}[];
  className?: string;
}

/**
 * Компонент отображения данных на детальных формах просмотра.
 */
export const InfoBlock = ({data, className}: IProps) => (
  <div className={`mini-info ${className ? className : ''}`}>
    {data.map((item, index) => (
      <div key={item.label} className="row">
        <div className="title">{item.label}</div>
        <div className="value">{item.value}</div>
      </div>
    ))}
  </div>
);
