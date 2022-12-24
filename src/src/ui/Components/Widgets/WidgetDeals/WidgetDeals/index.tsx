import {observer} from 'mobx-react-lite';
import useViewModel from '../../../../hooks/useViewModel';
import {IWidgetDealsViewModel} from '../../../../../ViewModel/viewModels/Widgets/WidgetDeals/interfaces';
import {VIEW_MODEL} from '../../../../../ViewModel/identifiers';
import React, {FC, useEffect} from 'react';
import {useFilters} from '../../../../hooks/useFilters';
import {Loader} from '../../../../Common/SimpleComponents/Loader';
import {Switcher} from '../../../../Common/SimpleComponents/Switcher';
import {DealsPieChart} from '../DealsPieChart';
import {NoData} from '../../../../Common/SimpleComponents/NoData';
import {ReactComponent as DocumentsIcon} from '../../../../../assets/svg/commonArea/Documents.svg';
import './index.less';

export const WidgetDeals: FC = observer(({children}) => {
  const {load, loading, data, dimension, setDimension} = useViewModel<
    IWidgetDealsViewModel
  >(VIEW_MODEL.WidgetDeals);

  const {subscribeOnFilters} = useFilters();
  useEffect(() => {
    subscribeOnFilters((filters) => {
      load(filters);
    });
    // eslint-disable-next-line
  }, []);

  const switcherItems = [
    {
      title: 'Количество сделок',
      value: 'count',
      selected: dimension === 'count',
      onClick: () => setDimension('count'),
    },
    {
      title: 'Сумма сделок',
      value: 'amount',
      selected: dimension === 'amount',
      onClick: () => setDimension('amount'),
    },
  ];

  return loading ? (
    <Loader />
  ) : data?.categories.length > 0 ? (
    <div className="widget-deals">
      <div className="widget-deals__header">
        <Switcher items={switcherItems} />
      </div>
      <div className="widget-deals__content">
        <div className="widget-deals__chart">
          <DealsPieChart valueFieldName={dimension} />
        </div>
        {children}
      </div>
    </div>
  ) : (
    <NoData icon={<DocumentsIcon />} message="Нет данных для отображения" />
  );
});
