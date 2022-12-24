import {Params} from 'router5/dist/types/base';
import {IBaseViewModel} from '../../Base/interfaces';
import {
  IWidgetExportAreaItem,
  IWidgetExportSource,
} from '../../../../Model/Widgets/WidgetExport';

export interface IWidgetExportViewModel extends IBaseViewModel {
  data?: IWidgetExportSource;
  dataFix: IWidgetExportAreaItem[];
  dataPlan: IWidgetExportAreaItem[];

  ticks: number[];
  domain: number[];

  load(params: Params): Promise<void>;
}
