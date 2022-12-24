import React from 'react';
import {ITableColumn} from '../../../../Common/TableComponents';
import {formatDateString} from '../../../../../Utils/Date/DateFormat';
import {StatusWrapper} from '../../../../Components/Accreditation/StatusWrapper';
import {IAccreditationDTO} from '../../../../../Model/Accreditation';

export const TableConfig: {
  [key in keyof IAccreditationDTO]?: ITableColumn<IAccreditationDTO>;
} = {
  id: {
    label: 'ID заявки',
  },
  bankName: {
    label: 'Банк',
    align: 'right',
  },
  createdAt: {
    label: 'Дата создания',
    wrapper: (value) => formatDateString(value, 'DD.MM.YYYY'),
    align: 'right',
  },
  updatedAt: {
    label: 'Дата изменения',
    wrapper: (value) => formatDateString(value, 'DD.MM.YYYY'),
    align: 'right',
  },
  employeeSurname: {
    label: 'Сотрудник',
    align: 'right',
  },
  status: {
    label: 'Статус',
    wrapper: (status) => <StatusWrapper status={status} />,
    align: 'right',
  },
};
