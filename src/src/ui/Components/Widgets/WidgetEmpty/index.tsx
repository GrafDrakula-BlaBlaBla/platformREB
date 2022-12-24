import React from 'react';
import NotInterestedIcon from '@material-ui/icons/NotInterested';
import {NoData} from '../../../Common/SimpleComponents/NoData';
import './index.less';

const WidgetEmpty = () => {
  return (
    <div className="widget-empty">
      <NoData message="Неизвестный виджет" icon={<NotInterestedIcon />} />
    </div>
  );
};

export default WidgetEmpty;
