import React from 'react';
import {Form, FormField, FormSection} from '../../../../Common/FormComponents';
import {CurrencyFieldControlView} from '../../../../Common/FieldControls';
import {ICFA_ReportDealDTO} from '../../../../../Model/CFA_Reports';
import {ReportExportContracts} from '../../ReportExportContracts';

interface IReportDealDetailsGAProps {
  data: ICFA_ReportDealDTO;
}

export const ReportDealDetailsGA = (props: IReportDealDetailsGAProps) => {
  const {data} = props;
  return (
    <div className="report-deal-details">
      <Form className="report-deal-details__form">
        <FormSection>
          <FormField isRow title="Лимит ГС">
            <CurrencyFieldControlView value={data.limit} />
          </FormField>
          <FormField isRow title="Неиспользованный лимит">
            <CurrencyFieldControlView value={data.unusedLimit} />
          </FormField>
        </FormSection>
        <FormSection>
          <FormField isRow title="Сумма увеличений аккредитива (выпущено)">
            <CurrencyFieldControlView value={data.issued} />
          </FormField>
          <FormField isRow title="Сумма уменьшений аккредитива (погашено)">
            <CurrencyFieldControlView value={data.paidFor} />
          </FormField>
        </FormSection>
        <FormSection>
          <FormField isRow title="Остаток (на начало периода)">
            <CurrencyFieldControlView value={data.preBalance} />
          </FormField>
          <FormField isRow title="Остаток (на конец периода)">
            <CurrencyFieldControlView value={data.balance} />
          </FormField>
        </FormSection>
      </Form>
      <ReportExportContracts data={data.exportContracts} />
    </div>
  );
};
