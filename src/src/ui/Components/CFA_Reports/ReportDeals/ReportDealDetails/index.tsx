import React from 'react';
import {ICFA_ReportDealDTO} from '../../../../../Model/CFA_Reports';
import {TReportDealsType} from '../index';
import {ReportDealDetailsGA} from '../../ReportFormGeneralAgreement/ReportDealDetailsGA';
import {ReportDealDetailsCC} from '../../ReportFormCreditContract/ReportDealDetailsCC';
import './index.less';

interface IReportDealDetailsProps {
  data: ICFA_ReportDealDTO;
  type: TReportDealsType;
}

export const ReportDealDetails = (props: IReportDealDetailsProps) => {
  const {data, type} = props;
  switch (type) {
    case 'general-agreement':
      return <ReportDealDetailsGA data={data} />;
    case 'credit-agreement':
      return <ReportDealDetailsCC data={data} />;
  }
};
