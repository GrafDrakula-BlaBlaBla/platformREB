import React from 'react';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import {Button, IButtonProps} from '../Button';
import './index.less';

export interface IDropDownProps {
  menuItems: JSX.Element[];
  button?: IButtonProps;
}

export function DropDown(props: IDropDownProps) {
  const {menuItems, button} = props;
  const [isOpen, setIsOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLButtonElement>(null);

  const handleToggle = () => setIsOpen(!isOpen);
  const handleClose = () => setIsOpen(false);

  return (
    <React.Fragment>
      {button ? (
        <Button
          {...button}
          onClick={handleToggle}
          buttonRef={anchorRef}
          endIcon={isOpen ? <ExpandLess /> : <ExpandMore />}
        />
      ) : (
        <Button
          onClick={handleToggle}
          buttonRef={anchorRef}
          variant="outlined"
          color="default"
          size="medium"
        >
          <MoreHorizIcon />
        </Button>
      )}
      <Popper
        open={isOpen}
        anchorEl={anchorRef.current}
        transition
        placement="bottom-end"
      >
        {({TransitionProps, placement}) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin: placement,
            }}
          >
            <Paper className="drop-down__popper">
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList>
                  {menuItems.map((menuItem, index) => {
                    return (
                      <MenuItem key={index} onClick={handleClose}>
                        {menuItem}
                      </MenuItem>
                    );
                  })}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </React.Fragment>
  );
}
