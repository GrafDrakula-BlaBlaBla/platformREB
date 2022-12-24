import React from 'react';
import './index.less';

export interface IAccreditiveContainerProps {
  blocks: Array<{
    title: string;
    content: JSX.Element;
  }>;
}

export const AccreditiveContainer = (props: IAccreditiveContainerProps) => {
  const {blocks} = props;
  return (
    <div className="accreditive-container">
      {blocks.map((block, index) => (
        <div key={index} className="accreditive-container__block">
          <div className="accreditive-container__title">{block.title}</div>
          <div className="accreditive-container__content">{block.content}</div>
        </div>
      ))}
    </div>
  );
};
