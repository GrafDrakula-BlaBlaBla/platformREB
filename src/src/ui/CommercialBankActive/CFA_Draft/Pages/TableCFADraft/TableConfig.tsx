import React from 'react';
import {ICFADraftDTO} from '../../../../../Model/CFA_Draft';
import {ITableColumn} from '../../../../Common/TableComponents';
import {WrapperStatus} from '../../../../Components/CFA_Deal/WrapperStatus';
import {WrapperIndustry} from '../../../../Components/CFA_Deal/WrapperIndustry';
import {WrapperIndividualCategory} from '../../../../Components/CFA_Deal/WrapperIndividualCategory';

export const TableConfig: {
  [key in keyof ICFADraftDTO]?: ITableColumn<ICFADraftDTO>;
} = {
  requestId: {
    label: 'Id Сделки',
  },
  fullName: {
    label: 'Наименование заемщика',
  },
  inn: {
    label: 'ИНН Заемщика',
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
    label: 'Суьбект РФ',
  },
  status: {
    label: 'Статус',
    wrapper: (value: string) => {
      return <WrapperStatus status={value} />;
    },
  },
};
