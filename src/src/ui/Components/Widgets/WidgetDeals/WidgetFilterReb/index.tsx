import {observer} from 'mobx-react-lite';
import React from 'react';
import numeral from 'numeral';
import useViewModel from '../../../../hooks/useViewModel';
import {IWidgetDealsViewModel} from '../../../../../ViewModel/viewModels/Widgets/WidgetDeals/interfaces';
import {VIEW_MODEL} from '../../../../../ViewModel/identifiers';
import {Segment} from '../Segment';
import './index.less';

const NUMERAL_FORMAT = '0,0.00';

export const WidgetFilterReb = observer(() => {
  const {dataCategories, setVisible, isVisible, dimension} = useViewModel<
    IWidgetDealsViewModel
  >(VIEW_MODEL.WidgetDeals);

  return (
    <div className="widget-filter-reb">
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
  );
});
