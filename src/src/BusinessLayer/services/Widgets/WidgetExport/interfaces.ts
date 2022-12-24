import {Params} from 'router5/dist/types/base';
import {IWidgetExportSource} from '../../../../Model/Widgets/WidgetExport';

export interface IWidgetExportService {
  getSource: (params: Params) => Promise<IWidgetExportSource>;
}
