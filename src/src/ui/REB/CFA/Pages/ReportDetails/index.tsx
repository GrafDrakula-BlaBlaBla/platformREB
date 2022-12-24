import React, {useContext, useEffect} from 'react';
import useViewModel from '../../../../hooks/useViewModel';
import {observer} from 'mobx-react-lite';
import {useRoute} from 'react-router5';
import {ICFA_ReportsRebViewModel} from '../../../../../ViewModel/viewModels/CFA_Reports';
import useRouterConst from '../../../../hooks/useRouterConst';
import PermissionContext from '../../../../app/contexts/PremissionContext';
import {SStorage} from '../../../../../Utils/Storage';
import {VIEW_MODEL} from '../../../../../ViewModel/identifiers';
import {ECFA_ReportStatus} from '../../../../../Model/CFA_Reports';
import {ReportPage} from '../../../../Components/CFA_Reports/ReportPage';

export const ReportDetails = observer(() => {
  const ROUTER_CONST = useRouterConst();
  const {router, route} = useRoute();

  const {report, acceptReport} = useViewModel<ICFA_ReportsRebViewModel>(
    VIEW_MODEL.CFA_Reports
  );

  const link = {
    title: 'К списку отчетов',
    onClick: () => {
      const routeName = ROUTER_CONST.CFA_REPORTS.fullName;
      router.navigate(routeName, {
        bankId: route.params.bankId,
        ...(SStorage.filters ? SStorage.filters[routeName] : {}),
      });
    },
  };

  const {isAccess} = useContext(PermissionContext);
  const canAcceptReportUrl = 'credit-for-accreditive/report';
  const canAcceptReport = isAccess(canAcceptReportUrl, 'POST');
  useEffect(() => {
    if (report?.reportStatus === ECFA_ReportStatus.NEW && canAcceptReport) {
      acceptReport(report.id).finally(() => {
        report.reportStatus = ECFA_ReportStatus.ACCEPTED;
      });
    }
  }, [report, acceptReport, canAcceptReport]);

  return <ReportPage pageLayoutLink={link} />;
});
