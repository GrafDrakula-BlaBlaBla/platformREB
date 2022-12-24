import React from 'react';
import {ICreditDTO} from '../../../Model/Credits';
import {StatusWrapper} from '../../Common/SimpleComponents/StatusWrapper';
import {ITableCollapseColumn} from './TableCollapseRow';

/**
 * будующие колонки таблицы
 */

export const CreditTableConfig: {
  [key in keyof ICreditDTO]?: ITableCollapseColumn<ICreditDTO>;
} = {
  creditId: {
    label: '№ заявки',
  },
  fullName: {
    label: 'Наименование заемщика',
  },
  inn: {
    label: 'ИНН заемщика',
  },
  loanAmount: {
    label: 'Размер кредита, RUB',
  },
  loanIssuedAmount: {
    label: 'Сумма выданного кредита, RUB',
  },
  loanUnusedLimit: {
    label: 'Неиспользованный лимит, RUB',
  },
  loanRestAmount: {
    label: 'Остаток кредита, RUB',
  },
  creditStatus: {
    label: 'Статус',
    wrapper: (status) => {
      return <StatusWrapper status={status} />;
    },
  },
};
