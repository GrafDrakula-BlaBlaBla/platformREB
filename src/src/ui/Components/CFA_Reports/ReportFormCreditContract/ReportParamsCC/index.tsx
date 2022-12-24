import React from 'react';
import {FormField, FormSection} from '../../../../Common/FormComponents';
import {CurrencyFieldControlView} from '../../../../Common/FieldControls';
import {ICFA_ReportAgreementDTO} from '../../../../../Model/CFA_Reports';
import {ReportSkeleton} from '../../ReportSkeleton';

interface IReportParamsCCProps {
  item?: ICFA_ReportAgreementDTO;
  loading?: boolean;
}

export const ReportParamsCC = (props: IReportParamsCCProps) => {
  const {item, loading} = props;
  return (
    <FormSection title="1. Параметры КД">
      {loading ? (
        <ReportSkeleton />
      ) : (
        <React.Fragment>
          <FormField isRow title="Лимит по кредиту">
            <CurrencyFieldControlView value={item?.limit} />
          </FormField>
          <FormField isRow title="Остаток на начало периода">
            <CurrencyFieldControlView value={item?.preBalance} />
          </FormField>
          <FormField isRow title="Выпущено за период">
            <CurrencyFieldControlView value={item?.issued} />
          </FormField>
          <FormField isRow title="Погашено за период">
            <CurrencyFieldControlView value={item?.paidFor} />
          </FormField>
          <FormField isRow title="Остаток на конец перида">
            <CurrencyFieldControlView value={item?.balance} />
          </FormField>
          <FormField isRow title="Доступный лимит по кредиту">
            <CurrencyFieldControlView value={item?.unusedLimit} />
          </FormField>
        </React.Fragment>
      )}
    </FormSection>
  );
};
