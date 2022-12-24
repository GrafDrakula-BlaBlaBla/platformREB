import React, {FC} from 'react';
import {ReactComponent as InformationIcon} from '../../../../assets/svg/commonArea/Substraction.svg';
import './index.less';

interface IProps {
  text: string;
}

export const Information: FC<IProps> = ({text}) => {
  return (
    <div className="information">
      <div className="information__icon">
        <InformationIcon />
      </div>
      <span className="information__text">{text}</span>
    </div>
  );
};
