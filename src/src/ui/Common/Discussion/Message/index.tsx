import React, {FC} from 'react';
import {ClassNameInjection} from '../../../../Utils/ClassNames/ClassNameInjection';
import {Skeleton} from '@material-ui/lab';
import './index.less';

interface IProps {
  title: string;
  time?: string;
  text?: string;
  self?: boolean;
  loading?: boolean;
}
export const Message: FC<IProps> = ({title, time, text, self, loading}) => {
  return (
    <div className="message">
      <div
        className={ClassNameInjection('message__papper', self ? 'self' : '')}
      >
        {loading ? (
          <Skeleton width={120} height={14} />
        ) : (
          <div className="message__title">
            {title}
            <span className="message__time">{time}</span>
          </div>
        )}
        {loading ? (
          <>
            <Skeleton width={200} height={14} />
            <Skeleton width={150} height={14} />
          </>
        ) : (
          <div className="message__text">{text}</div>
        )}
      </div>
    </div>
  );
};
