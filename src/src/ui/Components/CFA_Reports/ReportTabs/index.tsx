import React from 'react';
import {useRoute} from 'react-router5';
import useRouterConst from '../../../hooks/useRouterConst';
import {Switcher} from '../../../Common/SimpleComponents/Switcher';
import {SStorage} from '../../../../Utils/Storage';
import {observer} from 'mobx-react-lite';
import useViewModel from '../../../hooks/useViewModel';
import {ICFA_ReportsViewModel} from '../../../../ViewModel/viewModels/CFA_Reports';
import {VIEW_MODEL} from '../../../../ViewModel/identifiers';
import {Skeleton} from '@material-ui/lab';
import './index.less';

export const ReportTabs = observer(() => {
  const ROUTER_CONST = useRouterConst();
  const {route, router} = useRoute();

  const {loadingReport: loading, report} = useViewModel<ICFA_ReportsViewModel>(
    VIEW_MODEL.CFA_Reports
  );

  const routeGA = ROUTER_CONST.CFA_REPORTS.DETAILS_GENERAL_AGREEMENT.fullName;
  const routeCC = ROUTER_CONST.CFA_REPORTS.DETAILS_CREDIT_CONTRACT.fullName;

  const switcherItems = [
    {
      title: `Генеральное соглашение ${report?.generalAgreement.amount}`,
      value: routeGA,
      selected: route.name === routeGA,
      onClick: () => {
        router.navigate(
          routeGA,
          Object.assign(
            {id: route.params.id, bankId: route.params.bankId},
            SStorage.filters ? SStorage.filters[routeGA] : undefined
          )
        );
      },
    },
    {
      title: `Кредитный договор ${report?.creditAgreement.amount}`,
      value: routeCC,
      selected: route.name === routeCC,
      onClick: () => {
        router.navigate(
          routeCC,
          Object.assign(
            {id: route.params.id, bankId: route.params.bankId},
            SStorage.filters ? SStorage.filters[routeCC] : undefined
          )
        );
      },
    },
  ];

  return (
    <div className="report-details-tabs">
      {loading ? (
        <Skeleton width={488} height={50} />
      ) : (
        <Switcher items={switcherItems} />
      )}
    </div>
  );
});
