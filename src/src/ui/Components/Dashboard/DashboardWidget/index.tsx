import React, {Suspense} from 'react';
import {IDashboardItemDTO} from '../../../../Model/Dashboard';
import GetAppIcon from '@material-ui/icons/GetApp';
import {Button} from '../../../Common/SimpleComponents/Button';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import VisibilityIcon from '@material-ui/icons/Visibility';
import {observer} from 'mobx-react-lite';
import useViewModel from '../../../hooks/useViewModel';
import {IDashboardViewModel} from '../../../../ViewModel/viewModels/Dashboard/interfaces';
import {VIEW_MODEL} from '../../../../ViewModel/identifiers';
import {Loader} from '../../../Common/SimpleComponents/Loader';
import './index.less';

export interface IDashboardWidgetProps {
  widget: IDashboardItemDTO;
}

const loadWidget = (widget: IDashboardItemDTO) => {
  switch (widget.widget) {
    case 'WidgetDealsCom':
      return () => import('../../Widgets/WidgetDeals/com');
    case 'WidgetDealsReb':
      return () => import('../../Widgets/WidgetDeals/reb');
    case 'WidgetIndustry':
      return () => import('../../Widgets/WidgetIndustry');
    case 'WidgetCountries':
      return () => import('../../Widgets/WidgetCountries');
    case 'WidgetCredit':
      return () => import('../../Widgets/WidgetCredit');
    case 'WidgetExport':
      return () => import('../../Widgets/WidgetExport');
    default:
      return () => import('../../Widgets/WidgetEmpty');
  }
};

export const DashboardWidget = observer((props: IDashboardWidgetProps) => {
  const {widget} = props;
  const WidgetComponent = React.lazy(loadWidget(widget));

  const {isEdit, setItemIsVisible} = useViewModel<IDashboardViewModel>(
    VIEW_MODEL.Dashboard
  );

  const onVisibilityOff = () => {
    setItemIsVisible(widget.i, false);
  };
  const onVisibilityOn = () => {
    setItemIsVisible(widget.i, true);
  };

  return (
    <div className="dashboard-widget">
      {isEdit ? (
        widget.isVisible ? (
          <div className="dashboard-widget-backdrop_visible" />
        ) : (
          <div className="dashboard-widget-backdrop" />
        )
      ) : null}
      <div className="dashboard-widget-header">
        <div className="dashboard-widget-title">{widget.title}</div>
        <div className="dashboard-widget-buttons">
          {isEdit ? (
            widget.isVisible ? (
              <Button
                variant="outlined"
                color="default"
                size="medium"
                startIcon={<VisibilityOffIcon />}
                onClick={onVisibilityOff}
              >
                Скрыть
              </Button>
            ) : (
              <Button
                variant="outlined"
                color="default"
                size="medium"
                startIcon={<VisibilityIcon />}
                onClick={onVisibilityOn}
              >
                Показать
              </Button>
            )
          ) : (
            <Button
              variant="outlined"
              color="default"
              size="medium"
              startIcon={<GetAppIcon />}
              iconButton
              style={{display: 'none'}}
            />
          )}
        </div>
      </div>
      <div className="dashboard-widget-content">
        <Suspense fallback={<Loader />}>
          <WidgetComponent />
        </Suspense>
      </div>
    </div>
  );
});
