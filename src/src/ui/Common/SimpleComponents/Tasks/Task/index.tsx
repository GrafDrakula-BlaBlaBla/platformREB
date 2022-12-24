import React, {FC} from 'react';
import {ClassNameInjection} from '../../../../../Utils/ClassNames/ClassNameInjection';
import './index.less';

interface ITaskProps {
  className?: string;
}

export const Task: FC<ITaskProps> = (props) => {
  const {className, children} = props;
  return (
    <div className={ClassNameInjection('task', className)}>{children}</div>
  );
};
