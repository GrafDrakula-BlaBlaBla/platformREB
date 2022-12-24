import React from 'react';
import {
  TableFilterDateInterval,
  TableFilterSelect,
} from '../../../Common/TableComponents';
import {observer} from 'mobx-react-lite';
import {IBankViewModel} from '../../../../ViewModel/viewModels/Banks';
import {VIEW_MODEL} from '../../../../ViewModel/identifiers';
import useViewModel from '../../../hooks/useViewModel';
import './index.less';

export const StatisticsFilter = observer(() => {
  const {bankProductsSelectItems} = useViewModel<IBankViewModel>(
    VIEW_MODEL.Banks
  );

  return (
    <div className="statistics-filter">
      <div className="statistics-filter-left">
        {bankProductsSelectItems ? (
          <TableFilterSelect
            name="product"
            label="Продукты"
            items={bankProductsSelectItems}
            className="statistics-filter-left__products"
          />
        ) : undefined}
      </div>
      <div className="statistics-filter-right">
        <TableFilterDateInterval
          nameYearStart="fromDate"
          nameYearEnd="toDate"
        />
      </div>
    </div>
  );
});
