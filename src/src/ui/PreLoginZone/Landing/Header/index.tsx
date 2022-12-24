import React from 'react';
import {HeaderItem, IHeaderItemProps} from './HeaderItem';
import {useRouter} from 'react-router5';
import {ROUTER_CONST_PRE_LOGIN} from '../../../app/settings/routerConst/RouterConstPreLogin';
import {ReactComponent as LogoSmallIcon} from '../../../../assets/landing/svg/logo-small.svg';
import './index.less';
import Crutch from '../../../../Utils/Crutch';

export const Header = () => {
  const router = useRouter();
  const headerLinks: IHeaderItemProps[] = [
    {text: 'О платформе', href: '#about'},
    {text: 'Банкам', href: '#banks'},
    {text: 'Контакты', href: '#contacts'},
  ];
  const headerButtons: IHeaderItemProps[] = [
    {
      text: 'Начать работу',
      onClick: () => {
        router.navigate(ROUTER_CONST_PRE_LOGIN.BIC.name);
      },
      className: 'header-item_right',
    },
    {
      text: 'Личный кабинет',
      onClick: () => {
        const loginURI = Crutch.getLoginURL();
        window.location.replace(loginURI);
      },
      className: 'header-item_right header-item_outlined',
    },
  ];
  return (
    <div className="header">
      <div className="header-logo">
        <LogoSmallIcon />
      </div>
      <div className="header-links">
        <ul className="header-list">
          {headerLinks.map((item, index) => (
            <HeaderItem key={index} {...item} />
          ))}
        </ul>
      </div>
      <div className="header-buttons">
        <ul className="header-list">
          {headerButtons.map((item, index) => (
            <HeaderItem key={index} {...item} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export * from './HeaderItem';
