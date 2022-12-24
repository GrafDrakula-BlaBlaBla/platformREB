import React, {useEffect} from 'react';
import {observer} from 'mobx-react-lite';
import {ICFA_ReportsViewModel} from '../../../../ViewModel/viewModels/CFA_Reports';
import {ReportDeals} from '../ReportDeals';
import {Form} from '../../../Common/FormComponents';
import useViewModel from '../../../hooks/useViewModel';
import {Divider} from '../../../Common/SimpleComponents/Divider';
import {VIEW_MODEL} from '../../../../ViewModel/identifiers';
import {ReportParamsCC} from './ReportParamsCC';
import {useFilters} from '../../../hooks/useFilters';
import {useRoute} from 'react-router5';
import {ReportCreditAgreementTableConfig} from './config';

export const ReportFormCreditContract = observer(() => {
  const {route} = useRoute();

  const {
    report,
    reportCreditAgreements,
    getReportCreditAgreements,
    loading,
    loadingReport,
  } = useViewModel<ICFA_ReportsViewModel>(VIEW_MODEL.CFA_Reports);

  const {subscribeOnFilters} = useFilters();
  useEffect(() => {
    subscribeOnFilters((filters) => {
      getReportCreditAgreements(route.params.id, filters);
    });
    // eslint-disable-next-line
  }, []);

  return (
    <Form className="report-form">
      <ReportParamsCC item={report?.creditAgreement} loading={loadingReport} />
      <Divider />
      <ReportDeals
        loading={loading}
        total={reportCreditAgreements?.total || 0}
        data={reportCreditAgreements?.items || []}
        config={ReportCreditAgreementTableConfig}
        type="credit-agreement"
      />
    </Form>
  );
});
