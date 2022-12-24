import React from 'react';
import {IAboutItem, IAboutItemId} from '../../config';
import {ReactComponent as AboutBanksIcon} from '../../../../../assets/landing/svg/about-banks.svg';
import {ReactComponent as AboutExportersIcon} from '../../../../../assets/landing/svg/about-exporters.svg';
import {ReactComponent as AboutVedIcon} from '../../../../../assets/landing/svg/about-ved.svg';
import './index.less';

interface IAboutItemProps extends IAboutItem {
  onClick: (id: IAboutItemId) => void;
}

export const AboutItem = (props: IAboutItemProps) => {
  const {id, type, name, description, onClick} = props;
  return (
    <div className="about-item" onClick={() => onClick(id)}>
      <div className="about-item__icon">{getIcon(type)}</div>
      <div className="about-item__name">{name}</div>
      <div className="about-item__description">{description}</div>
    </div>
  );
};

const getIcon = (type: string) => {
  switch (type) {
    case 'banks':
      return <AboutBanksIcon />;
    case 'exporters':
      return <AboutExportersIcon />;
    case 'ved':
      return <AboutVedIcon />;
  }
};
