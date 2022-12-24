import React from 'react';
import {ROUTER_CONST_PRE_LOGIN} from '../routerConst/RouterConstPreLogin';
import {Landing} from '../../../PreLoginZone/Landing';
import {PageBic} from '../../../PreLoginZone/PageBic';
import {PageLogin} from '../../../PreLoginZone/PageLogin';
import {Registration} from '../../../PreLoginZone/Registration';
import {Page404} from '../../../Components/PageErrors/Page404';
import {RouterLinkWithLifeCycle} from '../../LifeCycle/RouterLinkWithLifeCycle';

export function getPageMapFromSegmentPreLogin(
  segment: string,
  path: string
): JSX.Element | null {
  switch (segment) {
    case ROUTER_CONST_PRE_LOGIN.HOME.name:
      return (
        <RouterLinkWithLifeCycle>
          <Landing />
        </RouterLinkWithLifeCycle>
      );
    case ROUTER_CONST_PRE_LOGIN.BIC.name:
      return (
        <RouterLinkWithLifeCycle>
          <PageBic />
        </RouterLinkWithLifeCycle>
      );
    case ROUTER_CONST_PRE_LOGIN.LOGIN.name:
      return (
        <RouterLinkWithLifeCycle>
          <PageLogin />
        </RouterLinkWithLifeCycle>
      );
    case ROUTER_CONST_PRE_LOGIN.PROFILE.name:
      return (
        <RouterLinkWithLifeCycle>
          <Registration />
        </RouterLinkWithLifeCycle>
      );
    default:
      return (
        <RouterLinkWithLifeCycle>
          <Page404 />
        </RouterLinkWithLifeCycle>
      );
  }
}
