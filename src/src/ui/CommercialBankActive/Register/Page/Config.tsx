import React from 'react';
import {EStatus} from '../../../../Model/Status';
import {StatusWrapper} from '../../../Common/SimpleComponents/StatusWrapper';
import {ITableColumn} from '../../../Common/TableComponents';
import {IRegistriesDTO} from '../../../../Model/Registries';

export const RegisterTableConfig: {
  [key in keyof IRegistriesDTO]?: ITableColumn<IRegistriesDTO>;
} = {
  objectId: {
    label: 'Номер',
  },
  createDate: {
    label: 'Дата',
  },
  loanCount: {
    label: 'Количество кредитов',
  },
  loanAmount: {
    label: 'Объем фондирования',
  },
  loanIssuedAmount: {
    label: 'Запрашиваемая выборка',
  },
  status: {
    label: 'Статус',
    wrapper: (status) => {
      return <StatusWrapper status={status} />;
    },
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
      label: 'Принят',
      value: EStatus.REGISTERS_APPROVED,
    },
    {
      label: 'Отклонён',
      value: EStatus.REGISTERS_REJECTED,
    },
  ],
  label: 'Статус',
  name: 'status',
};
