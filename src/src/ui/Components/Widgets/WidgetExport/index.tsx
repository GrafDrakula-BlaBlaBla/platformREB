import React from 'react';
import {observer} from 'mobx-react-lite';
import {ReactComponent as DocumentsIcon} from '../../../../assets/svg/commonArea/Documents.svg';
import {Loader} from '../../../Common/SimpleComponents/Loader';
import {NoData} from '../../../Common/SimpleComponents/NoData';
import {ExportLineChart} from './ExportLineChart';
import useViewModel from '../../../hooks/useViewModel';
import {VIEW_MODEL} from '../../../../ViewModel/identifiers';
import {IWidgetExportViewModel} from '../../../../ViewModel/viewModels/Widgets/WidgetExport/interfaces';
import './index.less';

const WidgetExport = observer(() => {
  const {loading, data} = useViewModel<IWidgetExportViewModel>(
    VIEW_MODEL.WidgetExport
  );

  return loading ? (
    <Loader />
  ) : Boolean(data) ? (
    <div className="widget-export">
      <ExportLineChart />
    </div>
  ) : (
    <NoData icon={<DocumentsIcon />} message="Нет данных для отображения" />
  );
});

export default WidgetExport;
