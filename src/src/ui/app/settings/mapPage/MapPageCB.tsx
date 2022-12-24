import React from 'react';
import {ROUTER_CONST_CB} from '../routerConst/RouterConstCB';
import {Home} from '../../../CommercialBank/Home';
import {getPageMapFromSegment} from './MapPageBase';
import {matchURLToAccreditationComponent} from '../../../CommercialBank/Accreditation/matchURLToAccreditationComponent';
import {RouterLinkWithLifeCycle} from '../../LifeCycle/RouterLinkWithLifeCycle';

export const getPageMapFromSegmentCB = (
  segment: string,
  path: string
): JSX.Element | null => {
  switch (segment) {
    case ROUTER_CONST_CB.HOME.name:
      return (
        <RouterLinkWithLifeCycle>
          <Home />
        </RouterLinkWithLifeCycle>
      );
    case ROUTER_CONST_CB.ACCREDITATION.name:
      return (
        <RouterLinkWithLifeCycle>
          {matchURLToAccreditationComponent(path)}
        </RouterLinkWithLifeCycle>
      );
    default:
      return (
        <RouterLinkWithLifeCycle>
          {getPageMapFromSegment(segment, path)}
        </RouterLinkWithLifeCycle>
      );
  }
};
