import React from 'react';
import {ROUTER_CONST_REB} from '../routerConst/RouterConstREB';
import {Home} from '../../../REB/Home';
import {getPageMapFromSegment} from './MapPageBase';
import {RouterLinkWithLifeCycle} from '../../LifeCycle/RouterLinkWithLifeCycle';
import {matchURLToRegisterComponent} from '../../../REB/Register/matchURLToRegisterComponents';
import {matchURLToReportsComponent} from '../../../REB/Reports';
import {matchURLToAccreditationComponent} from '../../../REB/Accreditation/matchURLToAccreditationComponent';
import {matchURLTo_CFA_Component} from '../../../REB/CFA/matchURLTo_CFA_Component';
import {matchURLTo_CFA_Statistics_Component} from '../../../REB/CFA_Statistics/matchURLTo_CFA_Statistics_Component';
import {matchURLTo_Statistics_Component} from '../../../REB/Statistics/matchURLTo_Statistics_Component';

export const getPageMapFromSegmentREB = (
  segment: string,
  path: string
): JSX.Element | null => {
  // @todo: для REGISTRIES, REPORTS переделать блоки просмотра информации на контролы форм и поля-просмотры
  switch (segment) {
    case ROUTER_CONST_REB.HOME.name:
      return (
        <RouterLinkWithLifeCycle>
          <Home />
        </RouterLinkWithLifeCycle>
      );
    case ROUTER_CONST_REB.ACCREDITATION.name:
      return (
        <RouterLinkWithLifeCycle>
          {matchURLToAccreditationComponent(path)}
        </RouterLinkWithLifeCycle>
      );
    case ROUTER_CONST_REB.REGISTRIES.name:
      return (
        <RouterLinkWithLifeCycle>
          {matchURLToRegisterComponent(path)}
        </RouterLinkWithLifeCycle>
      );
    case ROUTER_CONST_REB.REPORTS.name:
      return (
        <RouterLinkWithLifeCycle>
          {matchURLToReportsComponent(path)}
        </RouterLinkWithLifeCycle>
      );
    case ROUTER_CONST_REB.CFA_BANKS.name:
      return (
        <RouterLinkWithLifeCycle>
          {matchURLTo_CFA_Component(path)}
        </RouterLinkWithLifeCycle>
      );
    case ROUTER_CONST_REB.CFA_DEAL.name:
    case ROUTER_CONST_REB.CFA_REPORTS.name:
      return (
        <RouterLinkWithLifeCycle>
          {matchURLTo_CFA_Component(path)}
        </RouterLinkWithLifeCycle>
      );
    case ROUTER_CONST_REB.CREDIT_FOR_ACCREDITIVE.name:
      return (
        <RouterLinkWithLifeCycle>
          {matchURLTo_CFA_Statistics_Component(path)}
        </RouterLinkWithLifeCycle>
      );
    case ROUTER_CONST_REB.STATISTICS.name:
      return (
        <RouterLinkWithLifeCycle>
          {matchURLTo_Statistics_Component(path)}
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
