import React from 'react';
import {ITableColumn, Table} from '../../../Common/TableComponents';
import {ICFA_ReportDealDTO} from '../../../../Model/CFA_Reports';
import {ReportDealRowRenderer} from './ReportDealRowRenderer';
import {FormSection} from '../../../Common/FormComponents';
import {ReactComponent as CreditCardIcon} from '../../../../assets/svg/commonArea/CreditCard.svg';
import './index.less';

export type TReportDealsType = 'general-agreement' | 'credit-agreement';
interface IReportDealsProps {
  total: number;
  data: ICFA_ReportDealDTO[];
  config: {
    [key in keyof ICFA_ReportDealDTO]?: ITableColumn<ICFA_ReportDealDTO>;
  };
  loading?: boolean;
  type: TReportDealsType;
}

export const ReportDeals = (props: IReportDealsProps) => {
  const {data, total, loading, config, type} = props;
  return (
    <FormSection title="2. Заявления в отчете" className="report-deals">
      <Table<ICFA_ReportDealDTO>
        data={data}
        config={config}
        customRowRender={ReportDealRowRenderer(type)}
        pagination
        total={total}
        padding={false}
        loading={loading}
        emptyInfo={{icon: <CreditCardIcon />, message: 'Нет заявлений'}}
      />
    </FormSection>
  );
};
