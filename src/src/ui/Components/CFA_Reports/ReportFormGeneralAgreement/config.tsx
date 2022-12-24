import {ICFA_ReportDealDTO} from '../../../../Model/CFA_Reports';
import {ITableCollapseColumn} from '../../CreditsTable/TableCollapseRow';
import React from 'react';
import {WrapperNullName} from '../../CFA_Deal/WrapperFullName';

export const ReportGeneralAgreementTableConfig: {
  [key in keyof ICFA_ReportDealDTO]?: ITableCollapseColumn<ICFA_ReportDealDTO>;
} = {
  requestId: {label: 'ID Сделки'},
  agreementId: {label: 'Номер ГС'},
  fullName: {
    label: 'Заемщик',
    wrapper: (value: string, data?: ICFA_ReportDealDTO) => {
      return <WrapperNullName fullName={data?.fullName} inn={data?.inn} />;
    },
  },
  conclusionDt: {label: 'Дата заключения'},
  endDate: {label: 'Плановая дата окончания'},
};
