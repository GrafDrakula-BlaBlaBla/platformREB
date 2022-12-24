import React from 'react';
import {IReportDTO} from '../../../../Model/Reports';
import {StatusWrapper} from '../../../Common/SimpleComponents/StatusWrapper';
import {EStatus} from '../../../../Model/Status';
import {ITableColumn} from '../../../Common/TableComponents';

export const ReportsTableConfig: {
  [key in keyof IReportDTO]?: ITableColumn<IReportDTO>;
} = {
  objectId: {
    label: '№',
  },
  period: {
    label: 'Период',
  },
  loanCount: {
    label: 'Кол-во кредитов',
  },
  loanAmount: {
    label: 'Объём фондирования, RUB',
  },
  loanIssuedAmount: {
    label: 'Запрашиваемая выборка, RUB',
  },
  loanRestAmount: {
    label: 'Сумма остатков по кредитам, RUB',
  },
  status: {
    label: 'Статус',
    wrapper: (status) => <StatusWrapper status={status} />,
  },
};

export const statusSelectParams = {
  items: [
    {
      label: 'Все статусы',
      value: undefined,
    },
    {
      label: 'Новый',
      value: EStatus.REGISTERS_NEW,
    },
    {
      label: 'Согласованный',
      value: EStatus.REGISTERS_APPROVED,
    },
  ],
  label: 'Статус',
  name: 'status',
};
