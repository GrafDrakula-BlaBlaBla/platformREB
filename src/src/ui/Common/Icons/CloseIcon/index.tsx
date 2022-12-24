import React from 'react';
import {ReactComponent as CloseSVG} from '../../../../assets/svg/commonArea/CloseIcon.svg';
import './index.less';

export const CloseIcon = ({
  onClick,
  className,
}: {
  onClick: () => void;
  className: string;
}) => {
  return <CloseSVG onClick={onClick} className={`${className} close-svg`} />;
};
