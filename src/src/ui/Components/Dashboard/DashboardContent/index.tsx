import React from 'react';
import {observer} from 'mobx-react-lite';
import RGL, {WidthProvider} from 'react-grid-layout';
import useViewModel from '../../../hooks/useViewModel';
import {VIEW_MODEL} from '../../../../ViewModel/identifiers';
import {IDashboardViewModel} from '../../../../ViewModel/viewModels/Dashboard/interfaces';
import {DashboardWidget} from '../DashboardWidget';
import './index.less';

const ReactGridLayout = WidthProvider(RGL);

export const DashboardContent = observer((props) => {
  const {layoutProps, onLayoutChange, items, isEdit} = useViewModel<
    IDashboardViewModel
  >(VIEW_MODEL.Dashboard);

  return (
    <div className="dashboard-content">
      <ReactGridLayout {...layoutProps} onLayoutChange={onLayoutChange}>
        {items?.map((item) => {
          return (
            (isEdit || item.isVisible) && (
              <div key={item.i} data-grid={item.coordinates}>
                <DashboardWidget widget={item} />
              </div>
            )
          );
        })}
      </ReactGridLayout>
    </div>
  );
});
