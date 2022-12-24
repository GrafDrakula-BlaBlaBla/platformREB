import React from 'react';
import {ROUTER_CONST_CB_ACTIVE} from '../routerConst/RouterConstCBActive';
import {Home} from '../../../CommercialBankActive/Home';
import {getPageMapFromSegment} from './MapPageBase';
import {RouterLinkWithLifeCycle} from '../../LifeCycle/RouterLinkWithLifeCycle';
import {matchURLToRegisterComponent} from '../../../CommercialBankActive/Register/matchURLToRegisterComponent';
import {matchURLToReportsComponent} from '../../../CommercialBankActive/Reports/matchURLToReportsComponent';
import {matchURLToFoundationComponent} from '../../../CommercialBankActive/Foundation/matchURLToFoundationComponent';
import {matchURLToCreditComponent} from '../../../CommercialBankActive/Credits/matchURLToCreditComponent';
import {matchURLToAccreditationComponent} from '../../../CommercialBank/Accreditation/matchURLToAccreditationComponent';
import {matchURLTo_CFA_Draft_Component} from '../../../CommercialBankActive/CFA_Draft/matchURLTo_CFA_Draft_Component';
import {matchURLTo_Statistics_Component} from '../../../CommercialBankActive/Statistics/matchURLTo_Statistics_Component';
import {matchURLTo_CFA_Draft_Cancelled_Component} from '../../../CommercialBankActive/CFA_Draft_cancelled/matchURLTo_CFA_Draft_Cancelled_Component';
import {matchURLTo_CFA_Statistics_Component} from '../../../CommercialBankActive/CFA_Statistics/matchURLTo_CFA_Statistics_Component';
import {matchURLTo_BankSettings_Component} from '../../../CommercialBankActive/BankSettings/matchURLTo_BankSettings_Component';
import {matchURLTo_CFA_Component} from '../../../CommercialBankActive/CFA/matchURLTo_CFA_Component';

export const getPageMapFromSegmentCBActive = (
  segment: string,
  path: string
): JSX.Element | null => {
  // @todo: для REGISTRIES, FOUNDATION, CREDITS, REPORTS переделать блоки просмотра информации на контролы форм и поля-просмотры
  switch (segment) {
    case ROUTER_CONST_CB_ACTIVE.HOME.name:
      return (
        <RouterLinkWithLifeCycle>
          <Home />
        </RouterLinkWithLifeCycle>
      );
    case ROUTER_CONST_CB_ACTIVE.ACCREDITATION.name:
      return (
        <RouterLinkWithLifeCycle>
          {matchURLToAccreditationComponent(path)}
        </RouterLinkWithLifeCycle>
      );
    case ROUTER_CONST_CB_ACTIVE.REGISTRIES.name:
      return (
        <RouterLinkWithLifeCycle>
          {matchURLToRegisterComponent(path)}
        </RouterLinkWithLifeCycle>
      );
    case ROUTER_CONST_CB_ACTIVE.REPORTS.name:
      return (
        <RouterLinkWithLifeCycle>
          {matchURLToReportsComponent(path)}
        </RouterLinkWithLifeCycle>
      );
    case ROUTER_CONST_CB_ACTIVE.FOUNDATION.name:
      return (
        <RouterLinkWithLifeCycle>
          {matchURLToFoundationComponent(path)}
        </RouterLinkWithLifeCycle>
      );
    case ROUTER_CONST_CB_ACTIVE.CREDITS.name:
      return (
        <RouterLinkWithLifeCycle>
          {matchURLToCreditComponent(path)}
        </RouterLinkWithLifeCycle>
      );
    case ROUTER_CONST_CB_ACTIVE.CREDIT_FOR_ACCREDITIVE.name:
      return (
        <RouterLinkWithLifeCycle>
          {matchURLTo_CFA_Statistics_Component(path)}
        </RouterLinkWithLifeCycle>
      );
    case ROUTER_CONST_CB_ACTIVE.CFA_DEAL.name:
    case ROUTER_CONST_CB_ACTIVE.CFA_REPORTS.name:
      return (
        <RouterLinkWithLifeCycle>
          {matchURLTo_CFA_Component(path)}
        </RouterLinkWithLifeCycle>
      );
    case ROUTER_CONST_CB_ACTIVE.CFA_DRAFT.name:
      return (
        <RouterLinkWithLifeCycle>
          {matchURLTo_CFA_Draft_Component(path)}
        </RouterLinkWithLifeCycle>
      );
    case ROUTER_CONST_CB_ACTIVE.CFA_DRAFT_CANCELLED.name:
      return (
        <RouterLinkWithLifeCycle>
          {matchURLTo_CFA_Draft_Cancelled_Component(path)}
        </RouterLinkWithLifeCycle>
      );
    case ROUTER_CONST_CB_ACTIVE.STATISTICS.name:
      return (
        <RouterLinkWithLifeCycle>
          {matchURLTo_Statistics_Component(path)}
        </RouterLinkWithLifeCycle>
      );
    case ROUTER_CONST_CB_ACTIVE.BANK_SETTINGS.name:
      return (
        <RouterLinkWithLifeCycle>
          {matchURLTo_BankSettings_Component(path)}
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
