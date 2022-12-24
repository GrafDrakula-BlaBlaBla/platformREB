import React from 'react';
import {aboutItems, IAboutItemId} from '../config';
import {ServiceItem} from './ServiceItem';
import {ReactComponent as ServiceArrowIcon} from '../../../../assets/landing/svg/service-arrow.svg';
import './index.less';

export interface IServicesProps {
  className?: string;
  aboutItemId: IAboutItemId;
}

export const Service = (props: IServicesProps) => {
  const {className, aboutItemId} = props;
  const cls = ['service'];
  if (className) cls.unshift(className);

  const aboutItem = aboutItems.find((item, index) => item.id === aboutItemId);

  return (
    <div className={cls.join(' ')} id="service">
      <div className="service-arrow">
        <div className={`service-arrow_sel${aboutItem?.order}`}>
          <ServiceArrowIcon />
        </div>
      </div>
      <div className="service-title">{aboutItem?.title}</div>
      <div
        className={`service-items service-items_col${aboutItem?.services.length}`}
      >
        {aboutItem?.services.map((service, index) => (
          <ServiceItem {...service} key={index} />
        ))}
      </div>
    </div>
  );
};

export * from './ServiceItem';
