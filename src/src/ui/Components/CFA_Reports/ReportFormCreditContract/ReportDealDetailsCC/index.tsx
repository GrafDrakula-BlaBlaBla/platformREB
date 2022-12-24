import React from 'react';
import {Form, FormField, FormSection} from '../../../../Common/FormComponents';
import {CurrencyFieldControlView} from '../../../../Common/FieldControls';
import {ICFA_ReportDealDTO} from '../../../../../Model/CFA_Reports';
import {ReportExportContracts} from '../../ReportExportContracts';

interface IReportDealDetailsCAProps {
  data: ICFA_ReportDealDTO;
}

export const ReportDealDetailsCC = (props: IReportDealDetailsCAProps) => {
  const {data} = props;
  return (
    <div className="report-deal-details">
      <Form className="report-deal-details__form">
        <FormSection>
          <FormField isRow title="Лимит КД">
            <CurrencyFieldControlView value={data.limit} />
          </FormField>
          <FormField isRow title="Неиспользованный лимит">
            <CurrencyFieldControlView value={data.unusedLimit} />
          </FormField>
        </FormSection>
        <FormSection>
          <FormField isRow title="Итого выдано траншей">
            <CurrencyFieldControlView value={data.issued} />
          </FormField>
          <FormField isRow title="Погашено">
            <CurrencyFieldControlView value={data.paidFor} />
          </FormField>
        </FormSection>
        <FormSection>
          <FormField isRow title="Остаток основного долга (на начало периода)">
            <CurrencyFieldControlView value={data.preBalance} />
          </FormField>
          <FormField isRow title="Остаток основного долга (на конец периода)">
            <CurrencyFieldControlView value={data.balance} />
          </FormField>
        </FormSection>
      </Form>
      <ReportExportContracts data={data.exportContracts} />
    </div>
  );
};
