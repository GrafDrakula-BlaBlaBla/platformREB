import React, {useEffect} from 'react';
import useViewModel from '../../../hooks/useViewModel';
import {VIEW_MODEL} from '../../../../ViewModel/identifiers';
import {observer} from 'mobx-react-lite';
import {IWidgetDealsViewModel} from '../../../../ViewModel/viewModels/Widgets/WidgetDeals/interfaces';
import {useFilters} from '../../../hooks/useFilters';
import {WidgetDeals} from './WidgetDeals';
import {WidgetFilterCom} from './WidgetFilterCom';

const WidgetDealsCom = observer(() => {
  const {load} = useViewModel<IWidgetDealsViewModel>(VIEW_MODEL.WidgetDeals);

  const {subscribeOnFilters} = useFilters();
  useEffect(() => {
    subscribeOnFilters((filters) => {
      load(filters);
    });
    // eslint-disable-next-line
  }, []);

  return (
    <WidgetDeals>
      <WidgetFilterCom />
    </WidgetDeals>
  );
});

export default WidgetDealsCom;
