import React, {FC} from 'react';
import {ClassNameInjection} from '../../../../Utils/ClassNames/ClassNameInjection';
import './index.less';

interface ITasksProps {
  title?: string;
  className?: string;
}

export const Tasks: FC<ITasksProps> = ({title, className = '', children}) => {
  return (
    <div className={ClassNameInjection('tasks', className)}>
      {title ? <div className="tasks__title">{title}</div> : null}
      <div className="tasks__content">{children ? children : 'Нет задач'}</div>
    </div>
  );
};

export * from './Task';
