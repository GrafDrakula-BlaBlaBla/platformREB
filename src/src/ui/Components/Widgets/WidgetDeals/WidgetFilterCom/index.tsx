import {observer} from 'mobx-react-lite';
import React from 'react';
import numeral from 'numeral';
import useViewModel from '../../../../hooks/useViewModel';
import {IWidgetDealsViewModel} from '../../../../../ViewModel/viewModels/Widgets/WidgetDeals/interfaces';
import {VIEW_MODEL} from '../../../../../ViewModel/identifiers';
import {Segment} from '../Segment';
import './index.less';

const NUMERAL_FORMAT = '0,0.00';

export const WidgetFilterCom = observer(() => {
  const {
    dataCategories,
    dataBanks,
    setVisible,
    isVisible,
    dimension,
  } = useViewModel<IWidgetDealsViewModel>(VIEW_MODEL.WidgetDeals);

  return (
    <div className="widget-filter-com">
      <div className="widget-filter-com__categories">
        <Segment
          title={dimension === 'count' ? 'Сегмент' : 'Сегмент, ₽'}
          data={dataCategories.map((item) => {
            return {
              label: item.title,
              value:
                dimension === 'count'
                  ? item[dimension]
                  : numeral(item[dimension]).format(NUMERAL_FORMAT),
              name: item.name,
              checked: isVisible('categories', item.name),
            };
          })}
          onChange={(tags) => {
            tags.forEach((tag) =>
              setVisible('categories', tag.name, tag.checked)
            );
          }}
        />
      </div>
      <div className="widget-filter-com__banks">
        <Segment
          title={dimension === 'count' ? 'Банки' : 'Банки, ₽'}
          data={dataBanks.map((item) => {
            return {
              label: item.title,
              value:
                dimension === 'count'
                  ? item[dimension]
                  : numeral(item[dimension]).format(NUMERAL_FORMAT),
              name: item.name,
              checked: isVisible('banks', item.name),
            };
          })}
          onChange={(tags) => {
            tags.forEach((tag) => setVisible('banks', tag.name, tag.checked));
          }}
        />
      </div>
    </div>
  );
});
