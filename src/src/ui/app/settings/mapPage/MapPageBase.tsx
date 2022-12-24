import React from 'react';
import {ROUTER_CONST_BASE} from '../routerConst/RouterConstBase';
import {NotificationCenter} from '../../../Components/NotificationCenter';
import {UserArea} from '../../../Components/UserArea';
import {PageControls} from '../../../Components/PageControls';
import {RouterLinkWithLifeCycle} from '../../LifeCycle/RouterLinkWithLifeCycle';
import {Users} from '../../../Components/UserArea/Users';

export const getPageMapFromSegment = (
  segment: string,
  path: string
): JSX.Element => {
  switch (segment) {
    case ROUTER_CONST_BASE.NOTIFICATION_CENTER.name:
      return (
        <RouterLinkWithLifeCycle>
          <NotificationCenter />
        </RouterLinkWithLifeCycle>
      );
    case ROUTER_CONST_BASE.USERS.name:
      return (
        <RouterLinkWithLifeCycle>
          <Users />
        </RouterLinkWithLifeCycle>
      );
    case ROUTER_CONST_BASE.USER_AREA.name:
      return (
        <RouterLinkWithLifeCycle>
          <UserArea />
        </RouterLinkWithLifeCycle>
      );
    case ROUTER_CONST_BASE.CONTROLS.name:
      return (
        <RouterLinkWithLifeCycle>
          <PageControls />
        </RouterLinkWithLifeCycle>
      );
    default:
      return <RouterLinkWithLifeCycle></RouterLinkWithLifeCycle>;
  }
};
