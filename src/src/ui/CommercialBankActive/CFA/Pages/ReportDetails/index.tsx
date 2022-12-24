import React from 'react';
import {observer} from 'mobx-react-lite';
import {useRoute} from 'react-router5';
import {SStorage} from '../../../../../Utils/Storage';
import useRouterConst from '../../../../hooks/useRouterConst';
import {ReportPage} from '../../../../Components/CFA_Reports/ReportPage';

export const ReportDetails = observer(() => {
  const ROUTER_CONST = useRouterConst();
  const {router} = useRoute();

  const link = {
    title: 'К списку отчетов',
    onClick: () => {
      const routeName = ROUTER_CONST.CFA_REPORTS.fullName;
      router.navigate(
        routeName,
        SStorage.filters ? SStorage.filters[routeName] : undefined
      );
    },
  };

  return <ReportPage pageLayoutLink={link} />;
});
