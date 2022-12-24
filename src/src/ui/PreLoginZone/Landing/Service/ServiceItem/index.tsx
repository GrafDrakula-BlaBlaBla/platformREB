import React from 'react';
import {IServiceItem} from '../../config';
import {ReactComponent as ServiceLightIcon} from '../../../../../assets/landing/svg/service-light.svg';
import {ReactComponent as ServiceBarsIcon} from '../../../../../assets/landing/svg/service-bars.svg';
import {ReactComponent as ServiceListIcon} from '../../../../../assets/landing/svg/service-list.svg';
import {ReactComponent as ServicePieIcon} from '../../../../../assets/landing/svg/service-pie.svg';
import './index.less';

interface IServiceItemProps extends IServiceItem {}

export const ServiceItem = (props: IServiceItemProps) => {
  const {type, name, description} = props;
  return (
    <div className="service-item">
      <div className="service-item__icon">{getIcon(type)}</div>
      <div className="service-item__name">{name}</div>
      <div className="service-item__description">{description}</div>
    </div>
  );
};

const getIcon = (type: string) => {
  switch (type) {
    case 'light':
      return <ServiceLightIcon />;
    case 'bars':
      return <ServiceBarsIcon />;
    case 'list':
      return <ServiceListIcon />;
    case 'pie':
      return <ServicePieIcon />;
  }
};
