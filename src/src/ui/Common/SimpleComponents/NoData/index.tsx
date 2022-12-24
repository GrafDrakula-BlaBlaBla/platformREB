import React from 'react';
import './index.less';

interface IProps {
  icon?: JSX.Element;
  message?: string;
  reloadButton?: JSX.Element;
}

export const NoData = (props: IProps) => {
  const {icon, message = 'Нет данных', reloadButton} = props;
  return (
    <div className="no-data">
      {icon}
      <p className="no-data__message">{message}</p>
      {reloadButton ? reloadButton : null}
    </div>
  );
};
