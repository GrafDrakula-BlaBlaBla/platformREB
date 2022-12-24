import {Params} from 'router5/dist/types/base';
import {IWidgetExportSource} from '../../../../Model/Widgets/WidgetExport';

export interface IWidgetExportApiClient {
  getSource: (params: Params) => Promise<IWidgetExportSource>;
}
