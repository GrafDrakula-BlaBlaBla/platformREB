import React, {useEffect} from 'react';
import {observer} from 'mobx-react-lite';
import {ICFA_ReportsViewModel} from '../../../../ViewModel/viewModels/CFA_Reports';
import {ReportDeals} from '../ReportDeals';
import {Form} from '../../../Common/FormComponents';
import useViewModel from '../../../hooks/useViewModel';
import {Divider} from '../../../Common/SimpleComponents/Divider';
import {VIEW_MODEL} from '../../../../ViewModel/identifiers';
import {ReportParamsGA} from './ReportParamsGA';
import {useFilters} from '../../../hooks/useFilters';
import {useRoute} from 'react-router5';
import {ReportGeneralAgreementTableConfig} from './config';

export const ReportFormGeneralAgreement = observer(() => {
  const {route} = useRoute();

  const {
    report,
    reportGeneralAgreements,
    getReportGeneralAgreements,
    loading,
    loadingReport,
  } = useViewModel<ICFA_ReportsViewModel>(VIEW_MODEL.CFA_Reports);

  const {subscribeOnFilters} = useFilters();
  useEffect(() => {
    subscribeOnFilters((filters) => {
      getReportGeneralAgreements(route.params.id, filters);
    });
    // eslint-disable-next-line
  }, []);

  return (
    <Form className="report-form">
      <ReportParamsGA item={report?.generalAgreement} loading={loadingReport} />
      <Divider />
      <ReportDeals
        loading={loading}
        total={reportGeneralAgreements?.total || 0}
        data={reportGeneralAgreements?.items || []}
        config={ReportGeneralAgreementTableConfig}
        type="general-agreement"
      />
    </Form>
  );
});
