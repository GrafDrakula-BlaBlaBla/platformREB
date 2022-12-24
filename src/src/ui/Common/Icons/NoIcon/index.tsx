import React from 'react';
import './index.less';

export const NoIcon = ({className}: {className?: string}) => {
  const cls = ['MuiSvgIcon-root', 'no-icon'];
  if (className) cls.push(className);
  return <svg className={cls.join(' ')} viewBox="0 0 24 24" />;
};
