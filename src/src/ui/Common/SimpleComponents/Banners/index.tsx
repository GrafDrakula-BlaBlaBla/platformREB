import React, {FC} from 'react';
import {ClassNameInjection} from '../../../../Utils/ClassNames/ClassNameInjection';
import './index.less';

interface IBannersProps {
  className?: string;
}

export const Banners: FC<IBannersProps> = (props) => {
  const {className, children} = props;
  return (
    <div className={ClassNameInjection('banner-row', className)}>
      {children}
    </div>
  );
};

export * from './Banner';
