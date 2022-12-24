import React from 'react';
import {useRoute} from 'react-router5';
import useRouterConst from '../../../hooks/useRouterConst';
import {Switcher} from '../../../Common/SimpleComponents/Switcher';
import {CFAFilterDeals} from '../CFAFilterDeals';
import {CFAFilterReports} from '../CFAFilterReports';
import {SStorage} from '../../../../Utils/Storage';
import './index.less';

export const CFAFilters = () => {
  const ROUTER_CONST = useRouterConst();
  const {route, router} = useRoute();

  const routeDeals = ROUTER_CONST.CFA_DEAL.fullName;
  const routeReports = ROUTER_CONST.CFA_REPORTS.fullName;

  const switcherItems = [
    {
      title: 'Сделки',
      value: ROUTER_CONST.CFA_DEAL.fullName,
      selected: route.name === ROUTER_CONST.CFA_DEAL.fullName,
      onClick: () =>
        router.navigate(
          ROUTER_CONST.CFA_DEAL.fullName,
          Object.assign(
            {bankId: route.params.bankId},
            SStorage.filters ? SStorage.filters[routeDeals] : undefined
          )
        ),
    },
    {
      title: 'Отчеты',
      value: ROUTER_CONST.CFA_REPORTS.fullName,
      selected: route.name === ROUTER_CONST.CFA_REPORTS.fullName,
      onClick: () =>
        router.navigate(
          ROUTER_CONST.CFA_REPORTS.fullName,
          Object.assign(
            {bankId: route.params.bankId},
            SStorage.filters ? SStorage.filters[routeReports] : undefined
          )
        ),
    },
  ];

  return (
    <div className="cfa-filters">
      <div className="cfa-filters__left">
        <Switcher items={switcherItems} />
      </div>
      <div className="cfa-filters__right">
        {route.name === ROUTER_CONST.CFA_DEAL.fullName && <CFAFilterDeals />}
        {route.name === ROUTER_CONST.CFA_REPORTS.fullName && (
          <CFAFilterReports />
        )}
      </div>
    </div>
  );
};
