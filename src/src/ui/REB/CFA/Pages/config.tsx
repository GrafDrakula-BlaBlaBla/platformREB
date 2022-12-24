import React from 'react';
import NumberFormat from 'react-number-format';
import {ITableColumn} from '../../../Common/TableComponents';
import {ICFA_BankDTO} from '../../../../Model/Banks';
import {ICFAItemDTO} from '../../../../Model/CFA_Deal';
import {WrapperStatus} from '../../../Components/CFA_Deal/WrapperStatus';
import {WrapperIndustry} from '../../../Components/CFA_Deal/WrapperIndustry';
import {WrapperIndividualCategory} from '../../../Components/CFA_Deal/WrapperIndividualCategory';
import {
  ECFA_ReportStatusNames,
  ICFA_ReportDTO,
} from '../../../../Model/CFA_Reports';
import {StatusWrapper} from '../../../Components/CFA_Reports/StatusWrapper';
import {getSelectItems} from '../../../../Utils/Enum/getSelectItems';
import {WrapperNullName} from '../../../Components/CFA_Deal/WrapperFullName';
import {WrapperAssignedEmployees} from '../../../Components/CFA_Deal/WrapperAssignedEmployees';

export const TableBanksConfig: {
  [key in keyof ICFA_BankDTO]?: ITableColumn<ICFA_BankDTO>;
} = {
  bankName: {
    label: 'Наименование банка',
  },
  amountDeals: {
    label: 'Кол-во сделок',
  },
  amountReport: {
    label: 'Кол-во отчетов',
  },
  plannedSumDeals: {
    label: `Предварительная сумма кредитных договоров`,
    align: 'right',
    wrapper: (data: number) => {
      return (
        <NumberFormat value={data} displayType="text" thousandSeparator=" " />
      );
    },
  },
  factSumDeals: {
    label: `Сумма заключенных кредитных договоров`,
    align: 'right',
    wrapper: (data: number) => {
      return (
        <NumberFormat value={data} displayType="text" thousandSeparator=" " />
      );
    },
  },
};

export const TableDealsConfig: {
  [key in keyof ICFAItemDTO]?: ITableColumn<ICFAItemDTO>;
} = {
  requestId: {
    label: `ID сделки`,
  },
  fullName: {
    label: 'Наименование заемщика',
    wrapper: (value: string, data?: ICFAItemDTO) => {
      return <WrapperNullName fullName={data?.fullName} inn={data?.inn} />;
    },
  },
  industry: {
    label: 'Отрасль',
    wrapper: (value: string) => {
      return <WrapperIndustry industry={value} />;
    },
  },
  individualCategory: {
    label: 'Сегмент',
    wrapper: (value: string) => {
      return <WrapperIndividualCategory individualCategory={value} />;
    },
  },
  tb: {
    label: 'Регион',
  },
  assignedEmployees: {
    label: 'Ответственнные',
    wrapper: (value: string, data?: ICFAItemDTO) => {
      return <WrapperAssignedEmployees data={data?.assignedEmployees} />;
    },
  },
  status: {
    label: 'Статус',
    wrapper: (value: string) => {
      return <WrapperStatus status={value} />;
    },
  },
};

export const TableReportConfig: {
  [key in keyof ICFA_ReportDTO]?: ITableColumn<ICFA_ReportDTO>;
} = {
  objectId: {
    label: '№',
  },
  period: {
    label: 'Период',
  },
  amountOfAgreement: {
    label: 'Кол-во ГС',
  },
  valueOfAccreditives: {
    label: 'Объём аккредитивов, \nRUB',
    wrapper: (amount_accrdtv: number) => {
      return (
        <NumberFormat
          value={amount_accrdtv}
          thousandSeparator=" "
          decimalScale={2}
          displayType="text"
        />
      );
    },
  },
  valueOfIssued: {
    label: 'Запрашиваемая выборка,\n RUB',
    wrapper: (valueOf: number) => {
      return (
        <NumberFormat
          value={valueOf}
          thousandSeparator=" "
          decimalScale={2}
          displayType="text"
        />
      );
    },
  },
  valueOfAccredRests: {
    label: `Сумма остатков
    по ГС, RUB`,
    wrapper: (remaind_sum: number) => {
      return (
        <NumberFormat
          value={remaind_sum}
          thousandSeparator=" "
          decimalScale={2}
          displayType="text"
        />
      );
    },
  },
  reportStatus: {
    label: 'Статус',
    wrapper: (status: string) => {
      return <StatusWrapper status={status} />;
    },
  },
};

const statusSelectItems = getSelectItems(ECFA_ReportStatusNames);
export const statusSelectParams = {
  name: 'status',
  placeholder: 'Все статусы',
  items: statusSelectItems,
};
