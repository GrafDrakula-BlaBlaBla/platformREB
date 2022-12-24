import React, {FC} from 'react';
import './index.less';

export interface IFormProps {
  className?: string;
}

export const Form: FC<IFormProps> = ({className, children}) => {
  const classNames = ['form'];
  if (className) classNames.push(className);
  return <div className={classNames.join(' ')}>{children}</div>;
};
