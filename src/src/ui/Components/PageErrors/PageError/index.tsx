import React from 'react';
import moment from 'moment';
import {Button, IButtonProps} from '../../../Common/SimpleComponents/Button';
import './index.less';

export interface IPageErrorProps {
  className?: string;
  errorCode: string;
  errorTitle: string;
  errorBtn?: IButtonProps;
}

export const PageError = (props: IPageErrorProps) => {
  const {className, errorCode, errorTitle, errorBtn} = props;
  const cls = ['page-error'];
  if (className) cls.push(className);
  return (
    <div className={cls.join(' ')}>
      <div className="page-error__content">
        <div className="page-error__content-title">{errorCode}</div>
        <div className="page-error__content-text">{errorTitle}</div>
        {errorBtn ? (
          <Button {...errorBtn} className="page-error__content-button" />
        ) : null}
      </div>
      <div className="page-error__footer">
        1994–{moment().year()} АО РОСЭКСИМБАНК
      </div>
    </div>
  );
};
