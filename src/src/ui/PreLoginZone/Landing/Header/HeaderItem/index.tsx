import React from 'react';
import './index.less';

export interface IHeaderItemProps {
  text: string;
  href?: string;
  className?: string;
  onClick?: () => void;
}

export const HeaderItem = (props: IHeaderItemProps) => {
  const {text, href, className, onClick} = props;
  const cls = ['header-item'];
  if (className) cls.push(className);
  return (
    <li className={cls.join(' ')}>
      {onClick ? (
        <div onClick={onClick}>{text}</div>
      ) : (
        <a href={href}>{text}</a>
      )}
    </li>
  );
};
