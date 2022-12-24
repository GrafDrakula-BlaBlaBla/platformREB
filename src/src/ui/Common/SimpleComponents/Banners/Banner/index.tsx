import React, {FC} from 'react';
import {ClassNameInjection} from '../../../../../Utils/ClassNames/ClassNameInjection';
import './index.less';

interface IBannerProps {
  href?: string;
  onClick?: () => void;
  className?: string;
}

export const Banner: FC<IBannerProps> = ({
  href,
  onClick,
  className = '',
  children,
}) => {
  return (
    <div className={ClassNameInjection('banner', className)}>
      {href ? (
        <a
          className="banner__block"
          href={href}
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
        </a>
      ) : (
        <div className="banner__block" onClick={onClick}>
          {children}
        </div>
      )}
    </div>
  );
};
