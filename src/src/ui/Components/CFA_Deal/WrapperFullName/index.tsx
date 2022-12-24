import React, {FC} from 'react';
import {createNonBreakingSpace} from '../../../../Utils/String/createNonBreakingSpace';
import './index.less';

interface IProps {
  fullName?: string;
  inn?: string;
}

export const WrapperNullName: FC<IProps> = ({fullName, inn}) => {
  return (
    <div className="wrapper-full-name">
      <div className="wrapper-full-name__name">
        {fullName ? fullName : <span className="color-gray">не известно</span>}
      </div>
      <div className="wrapper-full-name__inn">
        {`ИНН:${createNonBreakingSpace()}${inn ? inn : 'не известно'}`}
      </div>
    </div>
  );
};
