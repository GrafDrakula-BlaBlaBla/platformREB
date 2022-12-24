import React from 'react';
import {ReactComponent as ChevronDownIcon} from '../../../../../assets/landing/svg/top-chevron-down.svg';
import './index.less';

export const TopChevron = () => {
  return (
    <div className="top-chevron">
      <a href="#about" className="top-chevron__button">
        <div className="top-chevron__button-inner">
          <ChevronDownIcon />
        </div>
      </a>
    </div>
  );
};
