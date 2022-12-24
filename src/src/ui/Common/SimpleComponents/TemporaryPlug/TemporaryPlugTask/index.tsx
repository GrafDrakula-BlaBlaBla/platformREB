import React, {FC, ReactNode} from 'react';
import './index.less';

interface ITemporaryPlugTaskProps {
  icon?: ReactNode;
  title?: string;
  text?: string;
  onClick?: () => void;
}

export const TemporaryPlugTask: FC<ITemporaryPlugTaskProps> = (props) => {
  const {icon, text, title, onClick} = props;
  return (
    <div className="temporary-plug-task" onClick={onClick}>
      <div className="temporary-plug-task__left">{icon}</div>
      <div className="temporary-plug-task__right">
        <div className="temporary-plug-task__description">
          <div className="temporary-plug-task__description-title">{title}</div>
          <div className="temporary-plug-task__description-info">{text}</div>
        </div>
        <div className="temporary-plug-task__link link" onClick={onClick}>
          Перейти в раздел
        </div>
      </div>
    </div>
  );
};
