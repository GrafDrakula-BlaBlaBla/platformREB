import React from 'react';
import NumberFormat from 'react-number-format';
import {IWidgetCountriesDTO} from '../../../../../Model/Widgets/WidgetCountries';
import {ITableColumn} from '../../../../Common/TableComponents';

export const config: {
  [key in keyof IWidgetCountriesDTO]?: ITableColumn<IWidgetCountriesDTO>;
} = {
  country: {
    label: 'Страна',
    wrapper: (_, row) => {
      return (
        <div className="country-table__country-name">
          {row?.flag && (
            <div className="country-table__country-name__flag">{row.flag}</div>
          )}
          {row && (
            <div className="country-table__country-name__text">
              {row.country[0].toUpperCase() + row.country.slice(1)}
            </div>
          )}
        </div>
      );
    },
  },
  contractsCount: {
    label: 'Кол-во контрактов',
  },
  contractsAmount: {
    label: 'Объем экспорта, ₽',
    wrapper: (_, row) => {
      return (
        <NumberFormat
          value={row?.contractsAmount}
          thousandSeparator=" "
          displayType="text"
        />
      );
    },
  },
};
