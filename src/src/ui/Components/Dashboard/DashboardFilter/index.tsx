import React, {FC} from 'react';
import './index.less';

export const DashboardFilter: FC = (props) => {
  const {children} = props;
  return <div className="dashboard-filter">{children}</div>;
};
