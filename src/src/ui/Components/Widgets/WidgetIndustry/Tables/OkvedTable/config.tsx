import React from 'react';
import {IIndustryDivisionOKVEDItem} from '../../../../../../Model/Widgets/WidgetIndustry';
import {ITableColumn} from '../../../../../Common/TableComponents';

export const config: {
  [key in keyof IIndustryDivisionOKVEDItem]?: ITableColumn<
    IIndustryDivisionOKVEDItem
  >;
} = {
  name: {
    label: 'Тип отрасли',
    wrapper: (_, row) => {
      return (
        <>
          {row?.code}. {row?.name}
        </>
      );
    },
  },
  countDeals: {
    label: 'Количество сделок',
  },
  amountDeals: {
    label: 'Объем, ₽',
  },
  countContracts: {
    label: 'Количество контрактов',
  },
  amountContracts: {
    label: 'Объем экспорта , ₽',
  },
};
