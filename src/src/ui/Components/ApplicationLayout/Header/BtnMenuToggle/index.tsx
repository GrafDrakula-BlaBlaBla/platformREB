import React from 'react';
import {IHeaderProps} from '../index';
import {observer} from 'mobx-react-lite';
import './index.less';

const isNotify = false;

export const BtnMenuToggle = observer((props: IHeaderProps) => {
  const {showMenuButton, setOpenMenu} = props;
  const cls = ['btn-menu-toggle'];
  if (showMenuButton) cls.push('btn-menu-toggle_show');
  return (
    <div
      className={cls.join(' ')}
      onClick={() => setOpenMenu?.(!showMenuButton)}
    >
      {isNotify ? <div className="btn-menu-toggle__notify" /> : null}
      <div className="btn-menu-toggle__top" />
      <div className="btn-menu-toggle__middle" />
      <div className="btn-menu-toggle__bottom" />
    </div>
  );
});
