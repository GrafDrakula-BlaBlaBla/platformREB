import React from 'react';
import {observer} from 'mobx-react-lite';
import {Link} from 'react-router5';
import useRouterConst from '../../../hooks/useRouterConst';
import {BtnMenuToggle} from './BtnMenuToggle';
import {BtnUserLabel} from './BtnUserLabel';
import {BtnUserMenu} from './BtnUserMenu';
import {BtnUserArea} from './BtnUserArea';
import {ReactComponent as Logo} from '../../../../assets/svg/header/logo.svg';
import './index.less';

export interface IHeaderProps {
  showMenuButton?: boolean;
  setOpenMenu?: (isShow: boolean) => void;
}

export interface IHeaderBtnProps {
  onClick?: () => void;
}

export const Header = observer((props: IHeaderProps) => {
  const routerConst = useRouterConst();

  const closeMenu = () => {
    props.setOpenMenu?.(false);
  };

  return (
    <div className="app-header">
      <div className="app-header__left">
        <div className="app-header__item app-header__item_menu-toggle">
          <BtnMenuToggle {...props} />
        </div>
        <Link
          className="app-header__item"
          onClick={() => props.setOpenMenu?.(false)}
          routeName={routerConst.HOME.name}
        >
          <Logo />
        </Link>
      </div>
      <div className="app-header__right">
        {/*<div className="app-header__item">*/}
        {/*  <BtnNotificationCenter onClick={closeMenu} />*/}
        {/*</div>*/}
        {/*<div className="app-header__item">*/}
        {/*  <NotificationPanel onClick={closeMenu} />*/}
        {/*</div>*/}
        <div className="app-header__item">
          <BtnUserArea onClick={closeMenu} />
        </div>
        <div className="app-header__item app-header__item_default">
          <BtnUserLabel />
        </div>
        <div className="app-header__item app-header__item_default">
          <BtnUserMenu />
        </div>
      </div>
    </div>
  );
});
