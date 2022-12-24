import React from 'react';
import {FormField, FormSection} from '../../../../Common/FormComponents';
import {CurrencyFieldControlView} from '../../../../Common/FieldControls';
import {ICFA_ReportAgreementDTO} from '../../../../../Model/CFA_Reports';
import {ReportSkeleton} from '../../ReportSkeleton';

interface IReportParamsGAProps {
  item?: ICFA_ReportAgreementDTO;
  loading?: boolean;
}

export const ReportParamsGA = (props: IReportParamsGAProps) => {
  const {item, loading} = props;
  return (
    <FormSection title="1. Параметры ГС">
      {loading ? (
        <ReportSkeleton />
      ) : (
        <React.Fragment>
          <FormField isRow title="Лимит ГС">
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
          <FormField isRow title="Доступный лимит ГС">
            <CurrencyFieldControlView value={item?.unusedLimit} />
          </FormField>
        </React.Fragment>
      )}
    </FormSection>
  );
};
