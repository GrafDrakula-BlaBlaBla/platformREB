import React, {useContext, useEffect, useState} from 'react';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import {Link, useRoute} from 'react-router5';
import PermissionContext from '../../../app/contexts/PremissionContext';
import {IMenuHierarchy} from '../../../../ViewModel/viewModels/Menu/interfaces';

export interface IMenuListItemProps extends IMenuHierarchy {
  onClick?: (id: number) => void;
  parentOpen?: (b: boolean) => void;
}

export const NewMenuItem = (props: IMenuListItemProps) => {
  const {
    id,
    childs: child,
    redirect,
    path,
    logo,
    title,
    active,
    parentId,
    permission,
    nestedPaths,
    onClick,
    parentOpen,
  } = props;
  const {route} = useRoute();

  useEffect(() => {
    if (
      route.name === path ||
      nestedPaths?.some((item) => item === route.name)
    ) {
      parentOpen?.(true);
    }
    //eslint-disable-next-line
  }, []);

  const menuItemClasses = `MainMenu-Item ${
    path === route.name ||
    active ||
    nestedPaths?.some((item) => item === route.name)
      ? 'MainMenu-Item_active'
      : ''
  } ${parentId !== null ? 'SubMenu-Item' : ''}`;
  const [subMenuIsOpen, setSubMenuIsOpen] = useState(false);

  const {isAccess} = useContext(PermissionContext);
  const canShow = isAccess('main-menu', permission);
  if (!canShow) {
    return null;
  }

  return (
    <React.Fragment key={id}>
      <div className={menuItemClasses}>
        <Link
          onClick={() => {
            onClick?.(id);
            if (props.redirect) {
              setTimeout(() => {
                setSubMenuIsOpen(true);
              });
            }
          }}
          routeName={redirect ? redirect : path}
          className="MainMenu-Link Link"
        >
          <div className="Link-Logo">{logo}</div>
          <div className="Link-Text">{title}</div>
        </Link>
        {child ? (
          <RenderArrow
            subMenuIsOpen={subMenuIsOpen}
            setSubMenuIsOpen={(isSubMenuIsOpen) => {
              setSubMenuIsOpen(isSubMenuIsOpen);
            }}
          />
        ) : null}
      </div>
      <Collapse className="SubMenu" in={subMenuIsOpen} timeout="auto">
        {child
          ? Array.from(child).map(([key, menuItem]) => {
              return (
                <NewMenuItem
                  key={menuItem.id}
                  {...menuItem}
                  onClick={() => {
                    onClick?.(menuItem.id);
                  }}
                  parentOpen={() => {
                    setTimeout(() => {
                      parentOpen?.(true);
                    }, 400);
                    setSubMenuIsOpen(true);
                  }}
                />
              );
            })
          : null}
      </Collapse>
    </React.Fragment>
  );
};

interface IArrowProps {
  subMenuIsOpen: boolean;
  setSubMenuIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const RenderArrow = ({subMenuIsOpen, setSubMenuIsOpen}: IArrowProps) => {
  const Arrow = subMenuIsOpen ? ExpandLess : ExpandMore;
  return (
    <Arrow
      className="MainMenu-Arrow"
      onClick={() => {
        setSubMenuIsOpen(!subMenuIsOpen);
      }}
    />
  );
};
