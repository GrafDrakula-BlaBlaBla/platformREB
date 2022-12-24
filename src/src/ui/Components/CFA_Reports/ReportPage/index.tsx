import React, {useEffect} from 'react';
import {ReportSubtitle} from '../ReportSubtitle';
import {PageLayout} from '../../../Common/PageLayout';
import {ReportTabs} from '../ReportTabs';
import useRouterConst from '../../../hooks/useRouterConst';
import {useRoute} from 'react-router5';
import {ReportFormGeneralAgreement} from '../ReportFormGeneralAgreement';
import {ReportFormCreditContract} from '../ReportFormCreditContract';
import {ICFA_ReportsViewModel} from '../../../../ViewModel/viewModels/CFA_Reports';
import {VIEW_MODEL} from '../../../../ViewModel/identifiers';
import useViewModel from '../../../hooks/useViewModel';
import {IButtonProps} from '../../../Common/SimpleComponents/Button';
import {ReactComponent as DownloadIcon} from '../../../../assets/svg/attachment/DownloadIcon2.svg';
import './index.less';

interface IReportPageProps {
  pageLayoutLink?: {
    title: string;
    onClick: () => void;
  };
}
export const ReportPage = (props: IReportPageProps) => {
  const {pageLayoutLink} = props;

  const ROUTER_CONST = useRouterConst();
  const {route} = useRoute();

  const {clearReport} = useViewModel<ICFA_ReportsViewModel>(
    VIEW_MODEL.CFA_Reports
  );

  const buttons: IButtonProps[] = [];
  buttons.push({
    variant: 'outlined',
    color: 'default',
    startIcon: <DownloadIcon style={{padding: 2}} />,
    onClick: () => {},
    iconButton: true,
  });

  useEffect(() => {
    return () => clearReport();
    // eslint-disable-next-line
  }, []);

  return (
    <PageLayout
      title="Отчет"
      subtitle={<ReportSubtitle />}
      link={pageLayoutLink}
      subTitleElement={<ReportTabs />}
      buttonGroupConfig={buttons}
      className="report-page"
    >
      {route.name ===
        ROUTER_CONST.CFA_REPORTS.DETAILS_GENERAL_AGREEMENT.fullName && (
        <ReportFormGeneralAgreement />
      )}
      {route.name ===
        ROUTER_CONST.CFA_REPORTS.DETAILS_CREDIT_CONTRACT.fullName && (
        <ReportFormCreditContract />
      )}
    </PageLayout>
  );
};
