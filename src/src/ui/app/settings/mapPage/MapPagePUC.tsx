import React from 'react';
import {Loader} from '../../../Common/SimpleComponents/Loader';
import {PageUserConfirm} from '../../../PageUserConfirm/PageUserConfirm';
import {ROUTER_CONST_PUC} from '../routerConst/RouterConstPUC';
import {RouterLinkWithLifeCycle} from '../../LifeCycle/RouterLinkWithLifeCycle';

export const getPageMapFromSegmentPUC = (
  segment: string,
  path: string
): JSX.Element | null => {
  switch (segment) {
    case ROUTER_CONST_PUC.HOME.name:
      return (
        <RouterLinkWithLifeCycle>
          <PageUserConfirm />
        </RouterLinkWithLifeCycle>
      );
    case ROUTER_CONST_PUC.USER_AREA.name:
      return (
        <RouterLinkWithLifeCycle>
          <Loader />
        </RouterLinkWithLifeCycle>
      );
    default:
      return (
        <RouterLinkWithLifeCycle>
          <PageUserConfirm />
        </RouterLinkWithLifeCycle>
      );
  }
};
