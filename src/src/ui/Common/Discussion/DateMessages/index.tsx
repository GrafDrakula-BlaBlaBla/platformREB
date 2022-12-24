import moment from 'moment';
import React, {FC} from 'react';
import {ClassNameInjection} from '../../../../Utils/ClassNames/ClassNameInjection';
import './index.less';

interface IProps {
  day: string;
  ref?: React.LegacyRef<HTMLDivElement>;
  className?: string;
}
export const DateMessages: FC<IProps> = ({day, ref, className}) => {
  return (
    <div ref={ref} className={ClassNameInjection('date-messages', className)}>
      {moment(day, 'DD.MM.YYYY').format('LL dddd')}
    </div>
  );
};
