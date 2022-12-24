import React, {useState} from 'react';
import {ReactComponent as DropdownArrow} from '../../../../../assets/svg/header/dropdownArrow.svg';
import {ReactComponent as LogoutIcon} from '../../../../../assets/svg/header/logout-exit.svg';
import {
  ClickAwayListener,
  Grow,
  MenuItem,
  MenuList,
  Paper,
  Popper,
} from '@material-ui/core';
import Crutch from '../../../../../Utils/Crutch';
import './index.less';

//@todo: доработать
export const BtnUserMenu = () => {
  const [isOpenUser, setIsOpenUser] = useState(false);
  const anchorRef = React.useRef<SVGSVGElement>(null);

  const onHandler = () => {
    setIsOpenUser(false);
  };

  const handlerLogout = () => {
    window.location.replace(Crutch.getLogoutURL());
  };

  return (
    <div className="btn-user-menu" onClick={() => setIsOpenUser(true)}>
      <DropdownArrow className="btn-user-menu__arrow" ref={anchorRef} />
      <Popper
        className="btn-user-menu__popper"
        open={isOpenUser}
        anchorEl={anchorRef.current}
        placement="bottom"
        transition
      >
        {({TransitionProps, placement}) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom' ? 'center top' : 'center bottom',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={onHandler}>
                <MenuList autoFocusItem={isOpenUser} id="menu-list-grow">
                  <MenuItem onClick={() => handlerLogout()}>
                    <LogoutIcon className="logoutIcon" />
                    Выйти
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
};
